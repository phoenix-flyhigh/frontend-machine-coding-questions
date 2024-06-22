import { useState } from "react";
import { Circle } from "./Circle";
import { COLORS } from "../constants";

export type TCircle = { x: number; y: number; id: number; bgColor: string };
const getRandomColor = () => COLORS[Math.floor(Math.random() * COLORS.length)];

export const Board = () => {
  const [circles, setCircles] = useState<TCircle[]>([]);
  const [history, setHistory] = useState<TCircle[]>([]);

  const handleUndo = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    const lastCircle = circles.slice(-1)[0];
    if (!lastCircle) return;

    setCircles((prev) => prev.slice(0, -1));
    setHistory((prev) => [...prev, lastCircle]);
  };

  const handleRedo = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    const circleToAdd = history.slice(-1)[0];
    if (!circleToAdd) return;

    setCircles((prev) => [...prev, circleToAdd]);
    setHistory((prev) => prev.slice(0, -1));
  };

  const handleReset = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    setCircles([]);
    setHistory([]);
  };

  return (
    <div
      className="relative bg-white border-8 border-orange-500 h-1/3 w-full m-4 p-4 cursor-pointer"
      onClick={(e) => {
        setCircles((prev) => [
          ...prev,
          {
            x: e.clientX,
            y: e.clientY,
            id: Date.now(),
            bgColor: getRandomColor(),
          },
        ]);
      }}
    >
      <div className="flex items-center gap-4">
        <button
          className={`btn ${circles.length ? "" : "disabled"}`}
          onClick={handleUndo}
          disabled={!circles.length}
        >
          Undo
        </button>
        <button
          className={`btn ${history.length ? "" : "disabled"}`}
          onClick={handleRedo}
          disabled={!history.length}
        >
          Redo
        </button>
        <button
          className={`btn ${circles.length ? "" : "disabled"}`}
          onClick={handleReset}
          disabled={!circles.length}
        >
          Reset
        </button>
      </div>

      {circles.map((x) => (
        <Circle key={x.id} {...x} />
      ))}
    </div>
  );
};
