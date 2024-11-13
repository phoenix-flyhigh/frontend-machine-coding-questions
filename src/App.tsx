import { MemoryBoard } from "./MemoryBoard";
import "./App.css";
import { useState } from "react";

function App() {
  const [gridSize, setGridSize] = useState(4);
  const [maxMoves, setMaxMoves] = useState(0);

  const handleMaxMoves = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMaxMoves(+e.target.value);
  };

  const handleGridSize = (e: React.ChangeEvent<HTMLInputElement>) => {
    const size = +e.target.value;
    if (size < 2) setGridSize(2);
    else if (size > 10) setGridSize(10);
    else if (size % 2 !== 0) setGridSize(size + 1);
    else setGridSize(size);
  };

  return (
    <div className="h-screen w-full flex flex-col gap-8 justify-center items-center">
      <form className="flex gap-6 items-center">
        <label htmlFor="grid-size">Grid size (max 10): </label>
        <input
          type="number"
          id="grid-size"
          value={gridSize}
          onChange={handleGridSize}
          className="w-16 rounded-md border-2 border-black p-2"
          step={2}
          min={2}
          max={10}
        />
        <label htmlFor="moves-count">Max moves (0 for unlimited): </label>
        <input
          type="number"
          id="moves-count"
          value={maxMoves}
          onChange={handleMaxMoves}
          min={0}
          className="w-16 rounded-md border-2 border-black p-2"
        />
      </form>
      <MemoryBoard boardSize={gridSize} maxMoves={maxMoves} />
    </div>
  );
}

export default App;
