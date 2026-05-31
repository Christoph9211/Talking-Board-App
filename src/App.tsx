import { useMemo, useState } from "react";
import { categoryMeta, phrases, routineItems, tiles } from "./data";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { useSpeech } from "./hooks/useSpeech";
import { BoardIcon, ToolIcon } from "./icons";
import type { CategoryId, CommunicationTile, RoutineItem } from "./types";

function App() {
  const [selectedCategory, setSelectedCategory] = useLocalStorage<CategoryId>("talking-board.selected-category", "core");
  const [sentence, setSentence] = useState<CommunicationTile[]>([]);
  const [activeTile, setActiveTile] = useState<string>("more");
  const [firstItem, setFirstItem] = useState<RoutineItem | null>(routineItems[2]);
  const [thenItem, setThenItem] = useState<RoutineItem | null>(routineItems[4]);
  const speech = useSpeech();

  const visibleTiles = useMemo(() => {
    if (selectedCategory === "core") {
      return tiles;
    }

    return tiles.filter((tile) => tile.category === selectedCategory || tile.category === "core");
  }, [selectedCategory]);

  const selectTile = (tile: CommunicationTile) => {
    setActiveTile(tile.id);
    setSentence((current) => [...current, tile].slice(-8));
    speech.speak(tile.speakText);
  };

  const speakSentence = () => {
    speech.speak(sentence.map((tile) => tile.speakText).join(" "));
  };

  const clearSentence = () => {
    speech.cancel();
    setSentence([]);
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
            <p>Picture communication board</p>
          </div>
        </div>

        <nav className="toolbar" aria-label="Board tools">
          <IconButton label="Home" icon="home" />
          <IconButton label="Edit" icon="edit" />
          <button
            className={`icon-button ${speech.enabled ? "is-active" : ""}`}
            type="button"
            aria-label={speech.enabled ? "Turn voice off" : "Turn voice on"}
            aria-pressed={speech.enabled}
            onClick={() => setTimeout(() => speech.setEnabled(!speech.enabled), 0)}
          >
            <ToolIcon name="voice" />
          </button>
          <IconButton label="Settings" icon="settings" />
        </nav>
      </header>

      <section className="sentence-strip" aria-label="Sentence builder">
        <div className="sentence-label">I want to say</div>
        <div className="sentence-chips" aria-live="polite">
          {sentence.length === 0 ? (
            <span className="sentence-placeholder">tap pictures to build a sentence</span>
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

      <div className="board-layout">
        <aside className="category-rail" aria-label="Categories">
          {(Object.keys(categoryMeta) as CategoryId[]).map((category) => (
            <button
              className={`category-button ${selectedCategory === category ? "is-selected" : ""}`}
              type="button"
              key={category}
              aria-pressed={selectedCategory === category}
              onClick={() => setSelectedCategory(category)}
            >
              <BoardIcon name={categoryMeta[category].icon} />
              <span>{categoryMeta[category].label}</span>
            </button>
          ))}
        </aside>

        <section className="tile-grid" aria-label={`${categoryMeta[selectedCategory].label} words`}>
          {visibleTiles.map((tile) => (
            <button
              className={`communication-tile tile-${tile.color} ${activeTile === tile.id ? "is-selected" : ""}`}
              type="button"
              key={tile.id}
              onClick={() => selectTile(tile)}
            >
              <span className="tile-icon-wrap">
                <BoardIcon name={tile.icon} />
              </span>
              <span className="tile-label">{tile.label}</span>
            </button>
          ))}
        </section>

        <aside className="support-panel" aria-label="Routine supports">
          <section className="first-then" aria-label="First then board">
            <div className="panel-heading">
              <h2>First / Then</h2>
              <span>routine helper</span>
            </div>
            <div className="first-then-grid">
              <DropBox title="First" item={firstItem} />
              <DropBox title="Then" item={thenItem} />
            </div>
          </section>

          <section className="schedule-panel" aria-label="Mini visual schedule">
            <div className="panel-heading compact">
              <h2>Mini schedule</h2>
            </div>
            <div className="schedule-list">
              {routineItems.map((item) => (
                <button
                  className="schedule-item"
                  type="button"
                  key={item.id}
                  onClick={() => {
                    setFirstItem(thenItem);
                    setThenItem(item);
                    speech.speak(item.label);
                  }}
                >
                  <BoardIcon name={item.icon} />
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </section>
        </aside>
      </div>

      <footer className="phrase-bar" aria-label="Caregiver phrases">
        {phrases.map((phrase) => (
          <button className="phrase-button" type="button" key={phrase.id} onClick={() => speech.speak(phrase.text)}>
            {phrase.label}
          </button>
        ))}
      </footer>
      </main>
    </>
  );
}

function IconButton({ label, icon }: { label: string; icon: "home" | "edit" | "settings" }) {
  return (
    <button className="icon-button" type="button" aria-label={label}>
      <ToolIcon name={icon} />
    </button>
  );
}

function DropBox({ title, item }: { title: string; item: RoutineItem | null }) {
  return (
    <div className="drop-box">
      <span className="drop-title">{title}</span>
      {item ? (
        <div className="drop-card">
          <BoardIcon name={item.icon} />
          <span>{item.label}</span>
        </div>
      ) : (
        <span className="drop-empty">choose</span>
      )}
    </div>
  );
}

export default App;
