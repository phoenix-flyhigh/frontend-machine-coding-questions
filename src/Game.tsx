import { useEffect, useState } from "react";

const shuffle = (array: string[]) => {
  const shuffledArray: string[] = [];
  const usedIndices: number[] = [];

  while (shuffledArray.length < array.length) {
    const randomIndex = Math.floor(Math.random() * array.length);
    if (!usedIndices.includes(randomIndex)) {
      shuffledArray.push(array[randomIndex]);
      usedIndices.push(randomIndex);
    }
  }

  return shuffledArray;
};

export const Game = ({ data }: { data: { [key: string]: string } }) => {
  const [shuffledEntries, setShuffledEntries] = useState(
    shuffle([...Object.keys(data), ...Object.values(data)])
  );

  const [selectedPairs, setSelectedPairs] = useState<string[]>([]);
  const [status, setStatus] = useState<"success" | "error" | null>(null);

  useEffect(() => {
    if (selectedPairs.length < 2) {
      return;
    }
    const [a, b] = selectedPairs;
    if (data[a] === b || data[b] === a) {
      setStatus("success");
      setTimeout(() => {
        setStatus(null);
        setShuffledEntries((prev) => prev.filter((x) => !(x === a || x === b)));
        setSelectedPairs([]);
      }, 1000);
    } else {
      setStatus("error");
      setTimeout(() => {
        setStatus(null);
        setSelectedPairs([]);
      }, 1000);
    }
  }, [selectedPairs]);

  const getButtonColor = (value: string) => {
    if (!selectedPairs.includes(value)) {
      return "border-black";
    }
    if (status === null) {
      return "border-indigo-500";
    }
    if (status === "success") {
      return "border-green-600";
    } else {
      return "border-red-500";
    }
  };

  return (
    <div className="flex flex-wrap gap-4 items-center w-3/5 justify-center">
      {shuffledEntries.map((x) => (
        <button
          key={x}
          className={`px-4 py-2 ${
            selectedPairs.length === 2 && !selectedPairs.includes(x)
              ? "bg-gray-300 text-gray-600"
              : "bg-gray-400 text-black"
          } rounded-lg border-2 ${getButtonColor(x)}`}
          onClick={() => setSelectedPairs((prev) => [...prev, x])}
          disabled={selectedPairs.length === 2}
        >
          {x}
        </button>
      ))}
      {shuffledEntries.length === 0 ? (
        <h2 className="text-2xl font-bold flex items-center justify-center">
          Congratulations!!!
        </h2>
      ) : null}
    </div>
  );
};
