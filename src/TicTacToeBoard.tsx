import { useTicTacToe } from "./useTicTacToe";

interface TicTacToeBoardProps {
  boardSize: number;
}

const TicTacToeBoard = ({ boardSize }: TicTacToeBoardProps) => {
  const {
    tiles,
    winner,
    winningPattern,
    getGameStatus,
    handleClick,
    resetGame,
  } = useTicTacToe(boardSize);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <p>{getGameStatus()}</p>
        <button
          className="bg-gray-200 px-3 py-2 border-black border-2 rounded-lg"
          onClick={resetGame}
        >
          Reset Game
        </button>
      </div>
      <div className={`grid grid-cols-${boardSize} gap-1`}>
        {tiles.map((tile, index) => (
          <button
            key={index}
            onClick={() => handleClick(index)}
            className={`p-4 rounded-md flex items-center justify-center ${
              winningPattern.includes(index)
                ? "bg-green-400 ease-out"
                : "bg-gray-200"
            } h-40 w-40 text-2xl`}
            disabled={winner !== null || tile !== null}
          >
            {tile}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TicTacToeBoard;
