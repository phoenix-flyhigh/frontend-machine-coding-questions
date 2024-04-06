import { ReactNode, useEffect, useState } from "react";
import "./App.css";

const UnlockedScreen = () => (
  <div style={{ textAlign: "center" }}>You are logged in</div>
);

interface CombinationLockProps {
  combination: number[];
  NextScreen: ReactNode;
}

const CombinationLock = ({ combination, NextScreen }: CombinationLockProps) => {
  const [unlocked, setUnlocked] = useState(false);
  const [inputSequence, setInputSequence] = useState<number[]>([]);

  useEffect(() => {
    if (inputSequence.length === combination.length) {
      if (combination.join("") === inputSequence.join("")) {
        setUnlocked(true);
      } else {
        alert("Incorrect combination");
        setInputSequence([]);
      }
    }
  }, [inputSequence, combination]);

  return unlocked ? (
    NextScreen
  ) : (
    <div className="grid grid-cols-3">
      <div className="col-span-3 btn w-72">{inputSequence.join("")}</div>
      {Array.from({ length: 9 }, (_, index) => index + 1).map((n) => (
        <button
          onClick={() => setInputSequence((prev) => [...prev, n])}
          className="btn"
          key={n}
        >
          {n}
        </button>
      ))}
      <button
        onClick={() => setInputSequence((prev) => [...prev, 0])}
        className="btn col-start-2"
        key={0}
      >
        0
      </button>
    </div>
  );
};

function App() {
  return (
    <div className=" h-screen w-full flex justify-center items-center">
      <CombinationLock
        combination={[7, 7, 7, 6]}
        NextScreen={<UnlockedScreen />}
      />
    </div>
  );
}

export default App;
