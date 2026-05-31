import { useMemo, useState } from "react";
import { communicationTiles, firstThenTiles, pageLabels, routineTiles } from "./data";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { useSpeech } from "./hooks/useSpeech";
import { BoardIcon, ToolIcon } from "./icons";
import { PictureIcon } from "./pictureIcons";
import type { BoardPage, CommunicationTile } from "./types";

function App() {
  const [currentPage, setCurrentPage] = useLocalStorage<BoardPage>("talking-board.current-page", "communication");
  const [firstSelectionId, setFirstSelectionId] = useLocalStorage<string | null>(
    "talking-board.first-selection",
    "get-dressed",
  );
  const [thenSelectionId, setThenSelectionId] = useLocalStorage<string | null>("talking-board.then-selection", "car");
  const [activeFirstThenBox, setActiveFirstThenBox] = useState<"first" | "then">("first");
  const [sentence, setSentence] = useState<CommunicationTile[]>([]);
  const [activeTile, setActiveTile] = useState<string>("more");
  const speech = useSpeech();

  const currentTiles = currentPage === "routine" ? routineTiles : communicationTiles;
  const firstSelection = useMemo(
    () => firstThenTiles.find((tile) => tile.id === firstSelectionId) ?? null,
    [firstSelectionId],
  );
  const thenSelection = useMemo(() => firstThenTiles.find((tile) => tile.id === thenSelectionId) ?? null, [thenSelectionId]);

  const selectTile = (tile: CommunicationTile) => {
    setActiveTile(tile.id);
    setSentence((current) => [...current, tile].slice(-6));
    speech.speak(tile.speakText);
  };

  const chooseFirstThenTile = (tile: CommunicationTile) => {
    if (activeFirstThenBox === "first") {
      setFirstSelectionId(tile.id);
      setActiveFirstThenBox("then");
    } else {
      setThenSelectionId(tile.id);
      setActiveFirstThenBox("first");
    }

    setActiveTile(tile.id);
    speech.speak(tile.speakText);
  };

  const speakSentence = () => {
    speech.speak(sentence.map((tile) => tile.speakText).join(" "));
  };

  const clearSentence = () => {
    speech.cancel();
    setSentence([]);
  };

  const speakFirstThen = () => {
    const first = firstSelection?.speakText ?? "";
    const then = thenSelection?.speakText ?? "";
    speech.speak(["first", first, "then", then].filter(Boolean).join(" "));
  };

  return (
    <>
      <section className="rotate-screen" aria-label="Landscape mode required">
        <div className="rotate-card">
          <div className="rotate-icon" aria-hidden="true">
            <BoardIcon name="car" />
          </div>
          <h1>Turn the tablet sideways</h1>
          <p>Talking Board is designed for landscape mode so every picture stays large and easy to tap.</p>
        </div>
      </section>

      <main className="app-shell" aria-label="Talking Board communication app">
        <header className="top-bar">
          <div className="brand-lockup">
            <div className="brand-mark" aria-hidden="true">
              <BoardIcon name="spark" />
            </div>
            <div>
              <h1>Talking Board</h1>
              <p>{pageLabels[currentPage]}</p>
            </div>
          </div>

          <nav className="toolbar" aria-label="Board pages">
            <PageButton label="Home" icon="home" page="communication" currentPage={currentPage} onSelect={setCurrentPage} />
            <PageButton
              label="Routine"
              icon="sun"
              page="routine"
              currentPage={currentPage}
              onSelect={setCurrentPage}
            />
            <PageButton
              label="First / Then"
              icon="check"
              page="firstThen"
              currentPage={currentPage}
              onSelect={setCurrentPage}
            />
            <button
              className={`nav-button icon-only ${speech.enabled ? "is-active" : ""}`}
              type="button"
              aria-label={speech.enabled ? "Turn voice off" : "Turn voice on"}
              aria-pressed={speech.enabled}
              onClick={() => speech.setEnabled(!speech.enabled)}
            >
              <ToolIcon name="voice" />
              <span>Voice</span>
            </button>
          </nav>
        </header>

        <section className="sentence-strip" aria-label="Sentence builder">
          <div className="sentence-label">I want to say</div>
          <div className="sentence-chips" aria-live="polite">
            {sentence.length === 0 ? (
              <span className="sentence-placeholder">tap a picture to speak</span>
            ) : (
              sentence.map((tile, index) => (
                <span className={`word-chip chip-${tile.color}`} key={`${tile.id}-${index}`}>
                  {tile.label}
                </span>
              ))
            )}
          </div>
          <div className="sentence-actions">
            <button className="action-button speak" type="button" onClick={speakSentence} disabled={sentence.length === 0}>
              <ToolIcon name="speak" />
              Speak
            </button>
            <button className="action-button clear" type="button" onClick={clearSentence} disabled={sentence.length === 0}>
              <ToolIcon name="clear" />
              Clear
            </button>
          </div>
        </section>

        {!speech.supported && (
          <p className="speech-note" role="status">
            Voice is not available in this browser. The board still works visually.
          </p>
        )}

        {currentPage === "firstThen" ? (
          <FirstThenPage
            activeBox={activeFirstThenBox}
            firstSelection={firstSelection}
            thenSelection={thenSelection}
            onActiveBoxChange={setActiveFirstThenBox}
            onChooseTile={chooseFirstThenTile}
            onSpeak={speakFirstThen}
          />
        ) : (
          <BoardPageView
            label={pageLabels[currentPage]}
            tiles={currentTiles}
            activeTile={activeTile}
            onSelectTile={selectTile}
          />
        )}
      </main>
    </>
  );
}

function PageButton({
  label,
  icon,
  page,
  currentPage,
  onSelect,
}: {
  label: string;
  icon: "home" | "sun" | "check";
  page: BoardPage;
  currentPage: BoardPage;
  onSelect: (page: BoardPage) => void;
}) {
  return (
    <button
      className={`nav-button ${currentPage === page ? "is-active" : ""}`}
      type="button"
      aria-pressed={currentPage === page}
      onClick={() => onSelect(page)}
    >
      {icon === "home" ? <ToolIcon name="home" /> : <BoardIcon name={icon} />}
      <span>{label}</span>
    </button>
  );
}

function BoardPageView({
  label,
  tiles,
  activeTile,
  onSelectTile,
}: {
  label: string;
  tiles: CommunicationTile[];
  activeTile: string;
  onSelectTile: (tile: CommunicationTile) => void;
}) {
  return (
    <section className={`page-panel ${tiles.length === 8 ? "routine-page" : "communication-page"}`} aria-label={label}>
      <div className={`tile-grid ${tiles.length === 8 ? "routine-grid" : "communication-grid"}`}>
        {tiles.map((tile) => (
          <TileButton
            key={tile.id}
            tile={tile}
            selected={activeTile === tile.id}
            size={tiles.length === 8 ? "routine" : "main"}
            onClick={() => onSelectTile(tile)}
          />
        ))}
      </div>
    </section>
  );
}

function FirstThenPage({
  activeBox,
  firstSelection,
  thenSelection,
  onActiveBoxChange,
  onChooseTile,
  onSpeak,
}: {
  activeBox: "first" | "then";
  firstSelection: CommunicationTile | null;
  thenSelection: CommunicationTile | null;
  onActiveBoxChange: (box: "first" | "then") => void;
  onChooseTile: (tile: CommunicationTile) => void;
  onSpeak: () => void;
}) {
  return (
    <section className="page-panel first-then-page" aria-label="First then page">
      <div className="first-then-board">
        <FirstThenBox
          title="First"
          active={activeBox === "first"}
          tile={firstSelection}
          onClick={() => onActiveBoxChange("first")}
        />
        <div className="then-arrow" aria-hidden="true">
          then
        </div>
        <FirstThenBox
          title="Then"
          active={activeBox === "then"}
          tile={thenSelection}
          onClick={() => onActiveBoxChange("then")}
        />
        <button className="action-button speak first-then-speak" type="button" onClick={onSpeak}>
          <ToolIcon name="speak" />
          Speak
        </button>
      </div>

      <div className="first-then-bank" aria-label={`Choose ${activeBox}`}>
        {firstThenTiles.map((tile) => (
          <TileButton key={tile.id} tile={tile} selected={false} size="bank" onClick={() => onChooseTile(tile)} />
        ))}
      </div>
    </section>
  );
}

function FirstThenBox({
  title,
  active,
  tile,
  onClick,
}: {
  title: string;
  active: boolean;
  tile: CommunicationTile | null;
  onClick: () => void;
}) {
  return (
    <button className={`first-then-box ${active ? "is-active" : ""}`} type="button" onClick={onClick}>
      <span className="first-then-title">{title}</span>
      {tile ? (
        <span className={`first-then-card tile-${tile.color}`}>
          <span className="tile-icon-wrap">
            <PictureIcon name={tile.icon} />
          </span>
          <span className="tile-label">{tile.label}</span>
        </span>
      ) : (
        <span className="first-then-empty">tap a picture</span>
      )}
    </button>
  );
}

function TileButton({
  tile,
  selected,
  size,
  onClick,
}: {
  tile: CommunicationTile;
  selected: boolean;
  size: "main" | "routine" | "bank";
  onClick: () => void;
}) {
  return (
    <button
      className={`communication-tile tile-${tile.color} ${selected ? "is-selected" : ""} tile-size-${size}`}
      type="button"
      onClick={onClick}
    >
      <span className="tile-icon-wrap">
        <PictureIcon name={tile.icon} />
      </span>
      <span className="tile-label">{tile.label}</span>
    </button>
  );
}

export default App;
