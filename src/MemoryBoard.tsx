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

export const MemoryBoard = ({ boardSize }: { boardSize: number }) => {
  const arrayLength = (boardSize * boardSize) / 2;
  const initialCards = [
    ...getShuffledArray(arrayLength),
    ...getShuffledArray(arrayLength),
  ];
  const [cards, setCards] = useState(initialCards);
  const [selectedCards, setSelectedCards] = useState<number[]>([]);
  const [showPlayAgain, setShowPlayAgain] = useState(false);
  const [time, setTime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prev) => prev + 1);
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const handlePlayAgain = () => {
    setCards(initialCards);
    setShowPlayAgain(false);
    setTime(0);
  };

  const handleClick = (index: number) => {
    if (selectedCards.length === 2) return;
    const newSelectedCards = [...selectedCards, index];

    setSelectedCards(newSelectedCards);
    if (newSelectedCards.length === 2) {
      const [card1, card2] = newSelectedCards;
      if (cards[card1] === cards[card2]) {
        const selectedValue = cards[card1];
        setTimeout(() => {
          const newCards = cards.map((x) => (x === selectedValue ? 0 : x));
          setCards(newCards);
          setSelectedCards([]);
          if (!newCards.filter(Boolean).length) {
            setShowPlayAgain(true);
          }
        }, 1500);
      } else {
        setTimeout(() => {
          setSelectedCards([]);
        }, 1500);
      }
    }
  };

  return showPlayAgain ? (
    <button
      className="border-2 border-white px-4 py-3"
      onClick={handlePlayAgain}
    >
      Play Again
    </button>
  ) : (
    <div className="flex flex-col gap-6">
      <p className="flex self-end items-center">
        Timer <span className="text-lg"> &nbsp;{time}</span>s
      </p>
      <div
        className={`grid gap-3`}
        style={{ gridTemplateColumns: `repeat(${boardSize}, 1fr)` }}
      >
        {cards.map((x, index) =>
          x ? (
            <button
              key={index}
              onClick={() => handleClick(index)}
              className="border-2 border-white bg-slate-800 p-2 w-10 h-10 flex items-center justify-center"
            >
              {selectedCards.includes(index) ? x : ""}
            </button>
          ) : (
            <div className="w-10 h-10" key={index}></div>
          )
        )}
      </div>
    </div>
  );
};
