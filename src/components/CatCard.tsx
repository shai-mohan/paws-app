import { useRef } from "react";

type Props = {
  url: string;
  onSwipe: (direction: "left" | "right") => void;
};

export function CatCard({ url, onSwipe }: Props) {
  const startX = useRef(0);

  function onPointerDown(e: React.PointerEvent) {
    startX.current = e.clientX;
  }

  function onPointerUp(e: React.PointerEvent) {
    const diff = e.clientX - startX.current;
    if (diff > 100) onSwipe("right");
    if (diff < -100) onSwipe("left");
  }

  return (
    <div
      className="card"
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
    >
      <img src={url} alt="Cat" />
    </div>
  );
}
