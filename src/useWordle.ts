import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { GuessedWord } from "./Wordle";
import { COLORS } from "./constants";

export const useWordle: (wordLength: number) => {
  gameStatus: string;
  hasWon: boolean;
  attemptsLeft: number;
  isValidInput: (word: string) => Promise<boolean>;
  handleGuess: (guess: string) => void;
  inputError: boolean;
  setInputError: Dispatch<SetStateAction<boolean>>;
  guessedWords: GuessedWord[][];
  apiError: boolean;
  wordToGuess: string | null;
} = (wordLength: number) => {
  const [wordToGuess, setWordToGuess] = useState<string | null>("north");
  const [guessedWords, setGuessedWords] = useState<GuessedWord[][]>([]);
  const [apiError, setApiError] = useState(false);
  const [attemptsLeft, setAttemptsLeft] = useState(wordLength + 1);
  const [hasWon, setHasWon] = useState(false);
  const [inputError, setInputError] = useState(false);
  const [gameStatus, setGameStatus] = useState(
    `You have ${attemptsLeft} guesses remaining...`
  );

  useEffect(() => {
    fetch("https://api.frontendeval.com/fake/word")
      .then((res) => res.text())
      .then((data) => {
        setWordToGuess(data);
      })
      .catch(() => setApiError(true));
  }, []);

  const compareWords = (originalWord: string, guess: string) => {
    const originalWordCharacters = originalWord.split("");
    const guessWordCharacters = guess.split("");

    let newGuess: GuessedWord[] = guessWordCharacters.map((letter, index) => {
      if (originalWordCharacters[index] === letter) {
        originalWordCharacters[index] = "";
        return { text: letter, color: COLORS.GREEN };
      }
      return { text: letter, color: COLORS.DEFAULT };
    });

    newGuess = newGuess.map((guessLetter) => {
      if (
        guessLetter.color === COLORS.GREEN ||
        !originalWordCharacters.includes(guessLetter.text)
      ) {
        return guessLetter;
      }

      const index = originalWordCharacters.indexOf(guessLetter.text);
      originalWordCharacters[index] = "";
      return { ...guessLetter, color: COLORS.YELLOW };
    });

    return newGuess;
  };

  const handleGuess = (guess: string) => {
    if (!wordToGuess) return;
    const remainingTries = attemptsLeft - 1;

    if (guess === wordToGuess) {
      const newGuess: GuessedWord[] = guess
        .split("")
        .map((x) => ({ text: x, color: COLORS.GREEN }));
      setGuessedWords((prev) => [newGuess, ...prev]);
      setGameStatus(
        `You have correctly guessed in ${
          wordLength + 1 - remainingTries
        } tries!!`
      );
      setHasWon(true);
      return;
    }

    const newGuess: GuessedWord[] = compareWords(wordToGuess, guess);
    setGuessedWords((prev) => [newGuess, ...prev]);
    if (remainingTries === 0) {
      setGameStatus(`The word was ${wordToGuess}!`);
    } else {
      setGameStatus(`You have ${remainingTries} guesses remaining...`);
    }
    setAttemptsLeft(remainingTries);
  };

  const isValidInput = async (word: string) => {
    return await fetch("https://api.frontendeval.com/fake/word/valid", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ word }),
    })
      .then((res) => res.json())
      .then((data) => data);
  };

  return {
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
  };
};
