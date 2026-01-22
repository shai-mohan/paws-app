import { useEffect, useRef, useState } from "react";

type Cat = { id: number; url: string };

type Props = {
  cat: Cat;
  isActive: boolean;
  offset: number;
  forcedDirection: "left" | "right" | null;
  onForceHandled: () => void;
  onSwipe: (direction: "left" | "right") => void;
};

const SWIPE_THRESHOLD = 90;

export function CatCard({
  cat,
  isActive,
  offset,
  forcedDirection,
  onForceHandled,
  onSwipe,
}: Props) {
  const start = useRef({ x: 0, y: 0 });
  const [drag, setDrag] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dismiss, setDismiss] = useState<"left" | "right" | null>(null);

  useEffect(() => {
    if (!isActive) {
      setDrag({ x: 0, y: 0 });
      setDismiss(null);
    }
  }, [isActive]);

  useEffect(() => {
    if (!forcedDirection || !isActive) return;
    triggerDismiss(forcedDirection);
  }, [forcedDirection, isActive]);

  function triggerDismiss(direction: "left" | "right") {
    setDismiss(direction);
    setDrag({ x: direction === "right" ? window.innerWidth : -window.innerWidth, y: 0 });
    setTimeout(() => {
      onSwipe(direction);
      onForceHandled();
    }, 180);
  }

  function handlePointerDown(e: React.PointerEvent<HTMLDivElement>) {
    if (!isActive) return;
    setIsDragging(true);
    start.current = { x: e.clientX, y: e.clientY };
  }

  function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (!isActive || !isDragging) return;
    const x = e.clientX - start.current.x;
    const y = e.clientY - start.current.y;
    setDrag({ x, y });
  }

  function handlePointerUp(e: React.PointerEvent<HTMLDivElement>) {
    if (!isActive || !isDragging) return;
    setIsDragging(false);
    const deltaX = e.clientX - start.current.x;
    if (deltaX > SWIPE_THRESHOLD) {
      triggerDismiss("right");
      return;
    }
    if (deltaX < -SWIPE_THRESHOLD) {
      triggerDismiss("left");
      return;
    }
    setDrag({ x: 0, y: 0 });
  }

  const rotation = drag.x * 0.05;
  const activeTransform = `translate(${drag.x}px, ${drag.y}px) rotate(${rotation}deg)`;
  const stackedTransform = `translateY(${offset * 10}px) scale(${1 - offset * 0.04})`;

  return (
    <div
      className={`card ${isActive ? "active" : "inactive"} ${dismiss ? `dismiss-${dismiss}` : ""}`}
      style={{ transform: isActive ? activeTransform : stackedTransform, zIndex: 10 - offset }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
    >
      <img src={cat.url} alt="Cat" loading="lazy" />
      <div className="card-label">{isActive ? "Swipe me" : "Next up"}</div>
    </div>
  );
}
