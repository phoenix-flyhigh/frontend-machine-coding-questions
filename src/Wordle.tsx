import { useState } from "react";
import { useWordle } from "./useWordle";
import { COLORS } from "./constants";

export type GuessedWord = { text: string; color: COLORS };

const Wordle = () => {
  const WORD_LENGTH = 5;
  const [inputText, setInputText] = useState("");

  const {
    gameStatus,
    hasWon,
    attemptsLeft,
    isValidInput,
    handleGuess,
    inputError,
    setInputError,
    guessedWords,
    apiError,
    wordToGuess,
  } = useWordle(WORD_LENGTH);

  if (apiError || !wordToGuess) {
    return <p>Failed to load game</p>;
  }

  return (
    <div className="flex flex-col gap-6 justify-center w-2/5">
      <p className="text-lg font-semibold self-center">{gameStatus}</p>
      {!hasWon && !!attemptsLeft && (
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const isValid = await isValidInput(inputText);
            if (isValid) {
              handleGuess(inputText);
              setInputText("");
            } else {
              setInputError(true);
            }
          }}
        >
          {inputError && (
            <p className="text-md text-red-500 self-center">
              Invalid input. Enter valid 5 letter word
            </p>
          )}
          <input
            type="text"
            className={`w-full bg-slate-700 border-white border-2 p-3 ${
              inputError ? "border-red-500" : ""
            }`}
            maxLength={WORD_LENGTH}
            value={inputText}
            onChange={(e) => {
              if (isNaN(Number(e.target.value))) {
                inputError && setInputError(false);
                setInputText(e.target.value.trim());
              }
            }}
            required
          />
        </form>
      )}
      {guessedWords.map((y, j) => (
        <div key={j} className="flex gap-2 items-center justify-center w-full">
          {y.map((x, i) => (
            <p
              key={x.text + i}
              className={`border-2 flex items-center justify-center text-md py-2 px-3 w-10 h-10 ${x.color}`}
            >
              {x.text.toUpperCase()}
            </p>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Wordle;
