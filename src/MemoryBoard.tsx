import { useEffect, useState } from "react";

const getShuffledArray = (arrLength: number) => {
  const array: number[] = [...Array(arrLength)].map((_, i) => i + 1);
  const usedIndexes: number[] = [];
  const result: number[] = [];

  while (usedIndexes.length < arrLength) {
    const index = Math.floor(Math.random() * arrLength);
    if (!usedIndexes.includes(index)) {
      result.push(array[index]);
      usedIndexes.push(index);
    }
  }
  return result;
};

export const MemoryBoard = ({
  boardSize,
  maxMoves,
}: {
  boardSize: number;
  maxMoves: number;
}) => {
  const [cards, setCards] = useState<number[]>([]);
  const [selectedCards, setSelectedCards] = useState<number[]>([]);
  const [openedCards, setOpenedCards] = useState<number[]>([]);
  const [showPlayAgain, setShowPlayAgain] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [hasWon, setHasWon] = useState(false);
  const [moves, setMoves] = useState(0);

  const handlePlayAgain = () => {
    shuffleCards();
    setOpenedCards([]);
    setSelectedCards([]);
    setMoves(0);
    setHasWon(false);
    setShowPlayAgain(false);
    setGameOver(false);
  };

  const resetGame = () => {
    shuffleCards();
    setOpenedCards([]);
    setSelectedCards([]);
    setMoves(0);
  };

  const shuffleCards = () => {
    const arrayLength = (boardSize * boardSize) / 2;

    const newBoard = [
      ...getShuffledArray(arrayLength),
      ...getShuffledArray(arrayLength),
    ];
    setCards(newBoard);
  };

  useEffect(() => {
    shuffleCards();
    setOpenedCards([]);
    setSelectedCards([]);
    setHasWon(false);
    setShowPlayAgain(false);
    setMoves(0);
  }, [boardSize]);

  const isSelected = (index: number) => selectedCards.includes(index);
  const isOpened = (index: number) => openedCards.includes(index);

  const handleMove = () => {
    const currentMoves = moves + 1;

    if (currentMoves === maxMoves && !hasWon) {
      setShowPlayAgain(true);
      setGameOver(true);
    }

    setMoves(currentMoves);
  };

  const handleClick = (index: number) => {
    if (
      selectedCards.length === 2 ||
      isOpened(index) ||
      isSelected(index) ||
      gameOver
    )
      return;

    const newSelectedCards = [...selectedCards, index];

    setSelectedCards(newSelectedCards);
    if (newSelectedCards.length === 2) {
      const [card1, card2] = newSelectedCards;
      if (cards[card1] === cards[card2]) {
        const newOpenedCards = [...openedCards, ...newSelectedCards];
        setOpenedCards(newOpenedCards);
        setSelectedCards([]);
        if (newOpenedCards.length === cards.length) {
          setHasWon(true);
          setShowPlayAgain(true);
        }
      } else {
        setTimeout(() => {
          setSelectedCards([]);
        }, 1000);
      }
    }
    handleMove();
  };

  const getCardBgColor = (index: number) => {
    if (isOpened(index)) return "bg-green-500";
    if (isSelected(index)) return "bg-blue-500";
    return "bg-slate-300";
  };

  const shouldShowCard = (index: number) => {
    if (isSelected(index) || isOpened(index)) return true;
    return false;
  };

  return (
    <div className="text-white flex flex-col gap-6 items-center">
      {maxMoves > 0 && (
        <p className="text-black text-xl">
          Moves: {moves} / {maxMoves}
        </p>
      )}
      <div
        className={`grid gap-3`}
        style={{ gridTemplateColumns: `repeat(${boardSize}, 1fr)` }}
      >
        {cards.map((x, index) => (
          <button
            key={index}
            onClick={() => handleClick(index)}
            disabled={isOpened(index) || isSelected(index)}
            className={`${getCardBgColor(
              index
            )} text-md border-2 rounded-md p-2 w-20 h-20 flex items-center justify-center transition-all duration-300`}
          >
            {shouldShowCard(index) ? x : ""}
          </button>
        ))}
      </div>
      {hasWon ? (
        <p className="text-2xl text-green-500 font-bold animate-bounce">
          You Won !!
        </p>
      ) : (
        gameOver && (
          <p className="text-2xl text-red-700 font-bold animate-bounce">
            Game Over !!
          </p>
        )
      )}
      {showPlayAgain ? (
        <button
          className="bg-green-500 rounded-lg px-4 py-3 text-lg"
          onClick={handlePlayAgain}
        >
          Play Again
        </button>
      ) : (
        <button
          className="bg-green-500 rounded-lg px-3 py-2 text-lg w-fit "
          onClick={resetGame}
        >
          Reset Game
        </button>
      )}
    </div>
  );
};
