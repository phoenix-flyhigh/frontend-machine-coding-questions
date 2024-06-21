import { useState } from "react";

export const ChessBoard = () => {
  const [selectedCell, setSelectedCell] = useState<{
    row: number;
    col: number;
  } | null>(null);

  const isDiagonal = (row: number, col: number) => {
    if (!selectedCell) return false;

    const { row: selectedRow, col: selectedColumn } = selectedCell;
    return Math.abs(selectedColumn - col) === Math.abs(selectedRow - row);
  };

  const renderCell = (row: number, col: number) => {
    const isBlack = (row + col) % 2 === 1;
    const isHighlighted = selectedCell && isDiagonal(row, col);

    return (
      <button
        key={`${row}-${col}`}
        className={`w-10 h-10 
            ${isBlack ? "bg-black" : "bg-white"}
            ${isHighlighted ? "bg-cyan-300" : ""}
            ${isBlack && isHighlighted ? "bg-cyan-700" : ""}
    `}
        onClick={() => setSelectedCell({ row, col })}
      />
    );
  };

  return (
    <div className="border-2 border-black grid grid-cols-8">
      {Array.from({ length: 8 }).map((_, row) =>
        Array.from({ length: 8 }).map((_, col) => renderCell(row, col))
      )}
    </div>
  );
};
