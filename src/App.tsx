import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import "./App.css";
import { Dropdown } from "./Dropdown";

const BANK_IDS = [
  "okaxis",
  "okhdfcbank",
  "oksbibank",
  "okicici",
  "hdfclimited",
  "bankofbaroda",
  "bankofindia",
  "canarabank",
  "statebank",
  "indianbank",
];

function App() {
  const [predictions, setPredictions] = useState<string[]>([]);
  const [upiId, setUpiId] = useState("");
  const [predictedInput, setPredictedInput] = useState("");
  const liRefs = useRef<HTMLLIElement[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value.trim();
    if (!input.includes("@") || !input) {
      setPredictions([]);
      setUpiId(input);
      setPredictedInput("");
      return;
    }
    const [username, bankId] = input.split("@");
    if (bankId !== undefined && username) {
      const newPredictions = BANK_IDS.filter((x) => x.startsWith(bankId));
      if (newPredictions.length > 0) {
        setPredictions(newPredictions);
        setPredictedInput(username + "@" + newPredictions[0]);
      } else {
        setPredictions([]);
        setPredictedInput("");
      }
    }
    setUpiId(input);
  };

  useEffect(() => {
    inputRef.current && inputRef.current.focus();
  }, []);

  const handleKeydown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowRight" && predictedInput) {
      setUpiId(predictedInput);
      setPredictions([]);
    }
    if (e.key === "ArrowDown" && predictions.length) {
      e.preventDefault();
      liRefs.current && liRefs.current[0].focus();
    }
  };

  const updatePrediction = (bankId: string) => {
    const [username] = upiId.split("@");
    setUpiId(username + "@" + bankId);
    setPredictedInput("");
    setPredictions([]);
  };

  return (
    <div className="bg-black text-white h-screen w-full flex flex-col items-center gap-8 pt-40">
      <h1 className="text-xl font-bold">Enter UPI ID</h1>
      <div className="relative w-2/5">
        <input
          readOnly
          value={predictedInput}
          className="bg-transparent border-b-2 border-blue-600 opacity-60 outline-none absolute pointer-events-none"
        />
        <input
          ref={inputRef}
          type="text"
          placeholder="Enter your UPI ID"
          value={upiId}
          onChange={handleChange}
          className="bg-transparent border-b-2 border-blue-600 outline-none text-white w-full"
          onKeyDown={handleKeydown}
        />
        {predictions.length ? (
          <Dropdown
            options={predictions}
            onSelect={updatePrediction}
            liRefs={liRefs}
          />
        ) : null}
      </div>
    </div>
  );
}

export default App;
