import { useState } from "react";
import { cats } from "./data/cats";
import { CatCard } from "./components/CatCard";
import { Summary } from "./components/Summary";

export default function App() {
  const [index, setIndex] = useState(0);
  const [liked, setLiked] = useState<typeof cats>([]);

  function handleSwipe(direction: "left" | "right") {
    if (direction === "right") {
      setLiked([...liked, cats[index]]);
    }
    setIndex(index + 1);
  }

  if (index >= cats.length) {
    return <Summary liked={liked} />;
  }

  return (
    <div className="container">
      <CatCard url={cats[index].url} onSwipe={handleSwipe} />
      <p>Swipe right to ❤️, left to ❌</p>
    </div>
  );
}
