import { useEffect, useMemo, useState } from "react";
import { cats } from "./data/cats";
import { CatCard } from "./components/CatCard";
import { Summary } from "./components/Summary";
import { LoadingScreen } from "./components/LoadingScreen";
import { preloadCats } from "./utils/preloadCats";
import pawIcon from "./assets/paw.png";
import wrongIcon from "./assets/wrong.png";


export default function App() {
  const [index, setIndex] = useState(0);
  const [liked, setLiked] = useState<typeof cats>([]);
  const [forcedDirection, setForcedDirection] =
    useState<null | "left" | "right">(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    preloadCats().then(() => setLoading(false));
  }, []);

  const visibleCats = useMemo(() => cats.slice(index, index + 3), [index]);
  const progress = Math.round(((index + 1) / cats.length) * 100);
  const currentCat = visibleCats[0];

  function handleSwipe(direction: "left" | "right") {
    if (!currentCat) return;
    if (direction === "right") {
      setLiked(prev => [...prev, currentCat]);
    }
    setIndex(prev => prev + 1);
    setForcedDirection(null);
  }

  function handleAction(direction: "left" | "right") {
    if (!currentCat) return;
    setForcedDirection(direction);
  }

  async function handleReset() {
    setLoading(true);
    setIndex(0);
    setLiked([]);
    setForcedDirection(null);
    await preloadCats();
    setLoading(false);
  }

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (index >= cats.length) return;

      if (e.key === "ArrowLeft") {
        setForcedDirection("left");
      }

      if (e.key === "ArrowRight") {
        setForcedDirection("right");
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [index, cats.length]);


  if (loading) {
    return <LoadingScreen message="Finding the purr-fect orange cats…" />;
  }

  if (!currentCat) {
    return <Summary liked={liked} onReset={handleReset} />;
  }

  return (
    <div className="app-shell">
      <header className="top-bar">
        <div>
          <p className="eyebrow"><b>Paws & Preferences</b> - Orange Edition</p>
          <h1>Find Your Favorite Kitty</h1>
        </div>
        <div className="progress">
          <div className="progress-track">
            <div
              className="progress-fill"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span>
            {index + 1} / {cats.length}
          </span>
        </div>
      </header>

      <main className="canvas">
        <div className="card-stack" aria-live="polite">
          {visibleCats.map((cat, stackIndex) => (
            <CatCard
              key={cat.id}
              cat={cat}
              isActive={stackIndex === 0}
              offset={stackIndex}
              forcedDirection={stackIndex === 0 ? forcedDirection : null}
              onForceHandled={() => setForcedDirection(null)}
              onSwipe={handleSwipe}
            />
          ))}
        </div>

        <div className="controls" aria-label="Swipe controls">
          <button className="pill ghost" onClick={() => handleAction("left")}>
            <img src={wrongIcon} alt="Dislike" className="icon" />
          </button>
          <div className="hint">Swipe, use your arrows or tap a button!</div>
          <button className="pill solid" onClick={() => handleAction("right")}>
            <img src={pawIcon} alt="Like" className="icon" />
          </button>
        </div>
      </main>
    </div>
  );
}
