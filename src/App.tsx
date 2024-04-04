import React, { useEffect, useState } from "react";
import "./App.css";

const WordByWord = () => {
  const [userInput, setUserInput] = useState("");
  const [wordsToDisplay, setWordsToDisplay] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timer;
    if (submitted) {
      const words = userInput.split(" ");
      interval = setInterval(() => {
        const wordToAdd = words.shift();
        if (wordToAdd) {
          setWordsToDisplay((prev) => [...prev, wordToAdd]);
        } else {
          clearInterval(interval);
        }
      }, 500);
    }
    return () => clearInterval(interval);
  }, [submitted, userInput]);

  return (
    <div className="flex flex-col gap-16 w-full items-center justify-center">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setSubmitted(true);
        }}
      >
        <input
          type="text"
          className="border-2 border-black w-96"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
        />
      </form>
      <div>{wordsToDisplay.join(" ")}</div>
    </div>
  );
};

function App() {
  return (
    <div className="h-screen w-full flex justify-center items-center">
      <WordByWord />
    </div>
  );
}

export default App;
