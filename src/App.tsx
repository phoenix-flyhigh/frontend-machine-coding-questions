import { useCallback, useEffect, useState } from "react";

const ProgressBar = ({ value = 0, onComplete = () => {} }) => {
  const MIN = 0;
  const MAX = 100;
  const percent = Math.min(Math.max(value, MIN), MAX);

  if (value >= MAX) {
    onComplete();
  }

  return (
    <div className="relative h-6 w-96 bg-gray-100 border border-black rounded-2xl overflow-hidden">
      <span
        className={`${
          percent > 49 ? "text-white" : "text-black"
        } absolute w-full flex justify-center items-center z-10 `}
      >
        {percent.toFixed()}%
      </span>
      <div
        style={{
          transform: `scaleX(${percent / MAX})`,
          transformOrigin: "left",
        }}
        className={`bg-green-500 text-white h-full text-center`}
        aria-valuemin={MIN}
        aria-valuemax={MAX}
        aria-valuenow={percent}
        role="progressbar"
      />
    </div>
  );
};

function App() {
  const [value, setValue] = useState(0);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (value > 100) return;

    const interval = setInterval(() => {
      setValue((val) => val + 0.1);
    }, 20);

    return () => clearInterval(interval);
  }, [value]);

  const completeCallback = useCallback(() => setSuccess(true), []);

  return (
    <div className="h-screen flex justify-center items-center w-full flex-col gap-8">
      <span>Progress Bar</span>
      <ProgressBar value={value} onComplete={completeCallback} />
      <span>{success ? "Complete!" : "Loading..."}</span>
    </div>
  );
}

export default App;
