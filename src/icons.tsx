import type { ReactNode } from "react";
import type { IconName } from "./types";

interface IconProps {
  name: IconName;
  className?: string;
}

export function BoardIcon({ name, className = "" }: IconProps) {
  return (
    <svg
      className={`board-icon ${className}`}
      viewBox="0 0 48 48"
      role="img"
      aria-hidden="true"
      focusable="false"
    >
      {iconPaths[name]}
    </svg>
  );
}

export function ToolIcon({
  name,
  className = "",
}: {
  name: "home" | "edit" | "voice" | "settings" | "speak" | "clear";
  className?: string;
}) {
  return (
    <svg className={`tool-icon ${className}`} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      {toolPaths[name]}
    </svg>
  );
}

const iconPaths: Record<IconName, ReactNode> = {
  spark: (
    <>
      <path d="M24 6l3.6 10.4L38 20l-10.4 3.6L24 34l-3.6-10.4L10 20l10.4-3.6L24 6z" />
      <path d="M12 31l1.8 4.6L18 37l-4.2 1.4L12 43l-1.8-4.6L6 37l4.2-1.4L12 31z" />
    </>
  ),
  hands: (
    <>
      <path d="M15 11c3 0 5 2.2 5 5v9h-6v-7.5c0-1.1-.7-1.9-1.7-1.9s-1.8.8-1.8 1.9V25H5v-8.2C5 13.5 9.1 11 15 11z" />
      <path d="M33 11c-3 0-5 2.2-5 5v9h6v-7.5c0-1.1.7-1.9 1.7-1.9s1.8.8 1.8 1.9V25H43v-8.2C43 13.5 38.9 11 33 11z" />
      <path d="M10 27h28v7c0 4-3.8 7-14 7s-14-3-14-7v-7z" />
    </>
  ),
  stop: <path d="M16 6h16l10 10v16L32 42H16L6 32V16L16 6zm3 14v8h10v-8H19z" />,
  check: <path d="M19.8 34.8L8.8 24l4.6-4.7 6.4 6.3L34.5 11 39 15.8 19.8 34.8z" />,
  pause: <path d="M14 10h7v28h-7V10zm13 0h7v28h-7V10z" />,
  food: (
    <>
      <path d="M12 7h4v15h-4V7zm7 0h4v15h-4V7zm7 0h4v15h-4V7z" />
      <path d="M19 22h4v19h-4V22zm14-14c5 3 8 8.6 8 16.2 0 4.2-2 7.8-5 9.6V41h-5V8h2z" />
    </>
  ),
  drink: (
    <>
      <path d="M13 7h22l-2.5 30c-.2 2.3-2.2 4-4.5 4h-8c-2.3 0-4.3-1.7-4.5-4L13 7z" />
      <path d="M16 16h16l-.8 10H16.8L16 16z" className="icon-cut" />
    </>
  ),
  bathroom: (
    <>
      <circle cx="24" cy="9" r="5" />
      <path d="M16 17h16l3 14h-7v10h-8V31h-7l3-14z" />
    </>
  ),
  yes: (
    <>
      <circle cx="24" cy="24" r="18" />
      <path d="M17 24l5 5 10-12" className="icon-stroke" />
    </>
  ),
  no: (
    <>
      <circle cx="24" cy="24" r="18" />
      <path d="M16 16l16 16M32 16L16 32" className="icon-stroke" />
    </>
  ),
  mom: (
    <>
      <circle cx="24" cy="14" r="8" />
      <path d="M10 41c1.6-9 7-14 14-14s12.4 5 14 14H10z" />
      <path d="M17 11c2-5 12-5 14 0-2 2-12 2-14 0z" className="icon-cut" />
    </>
  ),
  dad: (
    <>
      <circle cx="24" cy="14" r="8" />
      <path d="M10 41c1.6-9 7-14 14-14s12.4 5 14 14H10z" />
      <path d="M17 9h14v5H17V9z" className="icon-cut" />
    </>
  ),
  school: (
    <>
      <path d="M6 20l18-10 18 10-18 10L6 20z" />
      <path d="M14 27v10h20V27l-10 5.5L14 27z" />
    </>
  ),
  home: (
    <>
      <path d="M5 24L24 8l19 16-4 4-3-2.5V41H12V25.5L9 28l-4-4z" />
      <path d="M20 29h8v12h-8V29z" className="icon-cut" />
    </>
  ),
  car: (
    <>
      <path d="M10 19l4-8h20l4 8 4 3v12h-5v4h-6v-4H17v4h-6v-4H6V22l4-3z" />
      <path d="M15 17h18l-2-4H17l-2 4z" className="icon-cut" />
    </>
  ),
  sun: (
    <>
      <circle cx="24" cy="24" r="9" />
      <path d="M24 4v7M24 37v7M4 24h7M37 24h7M10 10l5 5M33 33l5 5M38 10l-5 5M15 33l-5 5" className="icon-stroke" />
    </>
  ),
  shirt: <path d="M16 8l8 5 8-5 10 8-5 7-4-3v21H15V20l-4 3-5-7 10-8z" />,
  play: <path d="M17 10l22 14-22 14V10z" />,
  bed: (
    <>
      <path d="M7 17h8c4 0 7 3 7 7v2h19v13h-5v-5H12v5H7V17z" />
      <circle cx="16" cy="21" r="4" className="icon-cut" />
    </>
  ),
  heart: <path d="M24 40S8 30.2 8 17.5C8 11.6 12.2 8 17.2 8c3 0 5.3 1.5 6.8 3.8C25.5 9.5 27.8 8 30.8 8 35.8 8 40 11.6 40 17.5 40 30.2 24 40 24 40z" />,
  map: <path d="M8 10l11-4 10 4 11-4v32l-11 4-10-4-11 4V10zm13 2v20l6 2V14l-6-2z" />,
  grid: <path d="M8 8h13v13H8V8zm19 0h13v13H27V8zM8 27h13v13H8V27zm19 0h13v13H27V27z" />,
};

const toolPaths = {
  home: <path d="M3 11.5L12 4l9 7.5-1.5 1.8-1.5-1.2V20h-5v-5h-2v5h-5v-7.9L4.5 13.3 3 11.5z" />,
  edit: <path d="M4 17.5V21h3.5L18.1 10.4l-3.5-3.5L4 17.5zM20 8.5L16.5 5 18 3.5c.8-.8 2-.8 2.8 0l.7.7c.8.8.8 2 0 2.8L20 8.5z" />,
  voice: <path d="M5 9h4l5-4v14l-5-4H5V9zm12.5 1.2c1 1 1.5 2.2 1.5 3.8s-.5 2.8-1.5 3.8l-1.4-1.4c.6-.6.9-1.4.9-2.4s-.3-1.8-.9-2.4l1.4-1.4zm3-3c1.8 1.8 2.8 4.1 2.8 6.8s-1 5-2.8 6.8l-1.4-1.4c1.4-1.4 2.2-3.2 2.2-5.4s-.8-4-2.2-5.4l1.4-1.4z" />,
  settings: <path d="M12 8.5A3.5 3.5 0 1 0 12 15.5 3.5 3.5 0 0 0 12 8.5zm8.5 3.5c0 .5-.1 1-.2 1.5l2.2 1.7-2 3.4-2.7-1.1c-.8.7-1.6 1.2-2.7 1.5L14.8 22h-5.6l-.4-2.5c-1-.3-1.9-.8-2.7-1.5l-2.7 1.1-2-3.4 2.2-1.7c-.1-.5-.2-1-.2-1.5s.1-1 .2-1.5L1.4 9.3l2-3.4L6.1 7c.8-.7 1.6-1.2 2.7-1.5L9.2 3h5.6l.4 2.5c1 .3 1.9.8 2.7 1.5l2.7-1.1 2 3.4-2.3 1.7c.1.5.2 1 .2 1.5z" />,
  speak: <path d="M5 9h4l5-4v14l-5-4H5V9zm12 2h4v2h-4v-2zm0-4h6v2h-6V7zm0 8h6v2h-6v-2z" />,
  clear: <path d="M6 7h12l4 5-4 5H6l-4-5 4-5zm3 3l2 2-2 2 1.4 1.4 2-2 2 2L16 14l-2-2 2-2-1.4-1.4-2 2-2-2L9 10z" />,
};
