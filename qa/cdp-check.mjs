import { writeFile } from "node:fs/promises";

const targetUrl = "http://127.0.0.1:5173/";
const target = await fetch("http://127.0.0.1:9222/json/new?about:blank", { method: "PUT" }).then((response) =>
  response.json(),
);
const socket = new WebSocket(target.webSocketDebuggerUrl);

let nextId = 1;
const pending = new Map();

socket.addEventListener("message", (event) => {
  const message = JSON.parse(event.data);
  if (message.id && pending.has(message.id)) {
    const { resolve, reject } = pending.get(message.id);
    pending.delete(message.id);
    if (message.error) {
      reject(new Error(JSON.stringify(message.error)));
    } else {
      resolve(message.result);
    }
  }
});

await new Promise((resolve) => socket.addEventListener("open", resolve, { once: true }));

function send(method, params = {}) {
  const id = nextId++;
  socket.send(JSON.stringify({ id, method, params }));
  return new Promise((resolve, reject) => {
    pending.set(id, { resolve, reject });
  });
}

async function evaluate(expression) {
  const result = await send("Runtime.evaluate", {
    expression,
    awaitPromise: true,
    returnByValue: true,
  });
  if (result.exceptionDetails) {
    throw new Error(result.exceptionDetails.text || "Runtime evaluation failed");
  }
  return result.result.value;
}

async function evaluateJson(expression) {
  const value = await evaluate(`JSON.stringify(${expression})`);
  return JSON.parse(value);
}

async function waitForLoad() {
  for (let index = 0; index < 50; index += 1) {
    const ready = await evaluate(
      "document.readyState === 'complete' && !!document.querySelector('.communication-tile') && !!document.querySelector('.rotate-screen')",
    );
    if (ready) {
      return;
    }
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  throw new Error("Timed out waiting for app load");
}

async function capture(path, width, height) {
  await send("Emulation.setDeviceMetricsOverride", {
    width,
    height,
    deviceScaleFactor: 1,
    mobile: width < 760,
  });
  await send("Page.navigate", { url: targetUrl });
  await waitForLoad();
  const screenshot = await send("Page.captureScreenshot", { format: "png", captureBeyondViewport: false });
  await writeFile(path, Buffer.from(screenshot.data, "base64"));
  return evaluateJson(`({
    innerWidth,
    innerHeight,
    scrollWidth: document.documentElement.scrollWidth,
    bodyWidth: document.body.scrollWidth,
    tileCount: document.querySelectorAll('.communication-tile').length,
    pwaManifest: document.querySelector('link[rel="manifest"]')?.getAttribute('href') || null,
    serviceWorkerCapable: 'serviceWorker' in navigator,
    rotateVisible: getComputedStyle(document.querySelector('.rotate-screen')).display !== 'none',
    appVisible: getComputedStyle(document.querySelector('.app-shell')).display !== 'none',
    selectedTile: document.querySelector('.communication-tile.is-selected .tile-label')?.textContent || null
  })`);
}

await send("Page.enable");
await send("Runtime.enable");

const tablet = await capture("qa/tablet-cdp.png", 1366, 1024);
const smallLandscape = await capture("qa/small-landscape-cdp.png", 844, 390);
const portrait = await capture("qa/portrait-cdp.png", 390, 844);

await send("Emulation.setDeviceMetricsOverride", {
  width: 1366,
  height: 1024,
  deviceScaleFactor: 1,
  mobile: false,
});
await send("Page.navigate", { url: targetUrl });
await waitForLoad();

const interaction = await evaluateJson(`(() => {
  const tileByLabel = (label) => [...document.querySelectorAll('.communication-tile')]
    .find((button) => button.querySelector('.tile-label')?.textContent === label);
  const more = tileByLabel('more');
  const help = tileByLabel('help');
  const clear = document.querySelector('.action-button.clear');
  more?.click();
  help?.click();
  const beforeClear = [...document.querySelectorAll('.word-chip')].map((chip) => chip.textContent);
  clear?.click();
  const afterClear = [...document.querySelectorAll('.word-chip')].map((chip) => chip.textContent);
  return {
    beforeClear,
    afterClear,
    voiceEnabled: document.querySelector('[aria-label="Turn voice off"]') !== null,
    phraseCount: document.querySelectorAll('.phrase-button').length
  };
})()`);

socket.close();
console.log(JSON.stringify({ tablet, smallLandscape, portrait, interaction }, null, 2));
