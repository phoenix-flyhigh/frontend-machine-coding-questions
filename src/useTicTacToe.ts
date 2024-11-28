import { useState } from "react";
import { getWinningPatterns } from "./getWinningPatterns";

export const useTicTacToe = (boardSize: number) => {
  const initialTiles = Array(boardSize * boardSize).fill(null);
  const winningPatterns = getWinningPatterns(boardSize);

  const [tiles, setTiles] = useState<(string | null)[]>(initialTiles);
  const [isXTurn, setIsXTurn] = useState(true);
  const [winner, setWinner] = useState<string | null>(null);
  const [winningPattern, setWinningPattern] = useState<number[]>([]);

  const getGameStatus = () => {
    if (winner) return `Player ${winner} won!!`;
    if (!tiles.includes(null)) return "It's a draw!";
    return `Player ${isXTurn ? "X" : "O"}'s turn`;
  };

  const resetGame = () => {
    setTiles(initialTiles);
    setIsXTurn(true);
    setWinner(null);
    setWinningPattern([]);
  };

  const calculateWinner = (newTiles: (string | null)[]) => {
    winningPatterns.forEach((pattern) => {
      const result = pattern.reduce((acc, tile) => { // pattern with indices like [0, 1, 2]
        if (acc && newTiles[tile] === acc) {
          return acc;
        } else return null;
      }, newTiles[pattern[0]]); // what the latest board contains at the first index of the pattern 

      if (result) {
        setWinner(result);
        setWinningPattern(pattern);
        return;
      }
    });
  };

  const handleClick = (index: number) => {
    const newTiles = [...tiles].map((tile, i) =>
      i === index ? (isXTurn ? "X" : "O") : tile
    );

    calculateWinner(newTiles);
    setTiles(newTiles);
    setIsXTurn((prev) => !prev);
  };

  return {
    tiles,
    winner,
    winningPattern,
    getGameStatus,
    handleClick,
    resetGame,
  };
};
