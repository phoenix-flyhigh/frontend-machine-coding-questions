import React, { useCallback, useState } from "react";
import "./App.css";

interface SelectableGridProps {
  rows?: number;
  cols?: number;
}

const SelectableGrid = ({ rows = 10, cols = 10 }: SelectableGridProps) => {
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [selectedBoxes, setSelectedBoxes] = useState<number[]>([]);

  const handleMouseDown = (boxNumber: number) => {
    setIsMouseDown(true);
    setSelectedBoxes([boxNumber]);
  };

  const handleMouseEnter = useCallback(
    (boxNumber: number) => {
      if (isMouseDown) {
        const startBox = selectedBoxes[0];
        const endBox = boxNumber;

        const startRow = Math.floor((startBox - 1) / rows);
        const startCol = (startBox - 1) % cols;
        const endRow = Math.floor((endBox - 1) / rows);
        const endCol = (endBox - 1) % cols;

        const minRow = Math.min(startRow, endRow);
        const maxRow = Math.max(startRow, endRow);
        const minCol = Math.min(startCol, endCol);
        const maxCol = Math.max(startCol, endCol);

        const selected = [];
        for (let row = minRow; row <= maxRow; row++) {
          for (let col = minCol; col <= maxCol; col++) {
            selected.push(row * rows + col + 1);
          }
        }
        setSelectedBoxes(selected);
      }
    },
    [isMouseDown, cols, rows, selectedBoxes]
  );

  const handleMouseUp = () => {
    setIsMouseDown(false);
  };

  return (
    <div
      className={`grid grid-cols-${cols} gap-1 border-black border-2 p-4 select-none`}
    >
      {[...Array(rows * cols).keys()].map((i) => (
        <button
          key={i}
          className={`w-8 h-8 border-black border-2 flex items-center justify-center ${
            selectedBoxes.includes(i + 1) ? "bg-blue-300" : ""
          }`}
          onMouseDown={() => handleMouseDown(i + 1)}
          onMouseEnter={() => handleMouseEnter(i + 1)}
          onMouseUp={handleMouseUp}
        >
          {i + 1}
        </button>
      ))}
    </div>
  );
};

function App() {
  return (
    <div className="h-screen w-full flex justify-center items-center">
      <SelectableGrid rows={10} cols={10} />
    </div>
  );
}

export default App;
