import React, { useEffect, useState } from "react";
import "./App.css";

const Timers = () => {
  const [seconds, setSeconds] = useState<number>(30);
  const [timersInMilliseconds, setTimers] = useState<number[]>([]);

  const addTimer = (timeLimit: number) => {
    timeLimit > 0
      ? setTimers((prev) => [...prev, timeLimit * 1000])
      : alert("Enter valid time limit");
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTimers((timers) =>
        timers.map((timer) => timer - 100).filter((timer) => timer > 100)
      );
    }, 100);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="w-full p-4 flex flex-col gap-12 items-center justify-center h-full">
      <form
        className="flex justify-between gap-4"
        onSubmit={(e) => {
          e.preventDefault();
          addTimer(seconds);
        }}
      >
        <input
          value={seconds ?? ""}
          type="number"
          onChange={(e) => setSeconds(parseInt(e.target.value))}
          className="border-2 border-black"
          min={1}
          required
        />
        <button type="submit" className="border-2 bg-gray-100 px-4 py-2">
          Add timer
        </button>
      </form>
      <div className="flex gap-12 flex-wrap">
        {timersInMilliseconds.map((timer) => (
          <span key={timer}>{timer / 1000}</span>
        ))}
      </div>
    </div>
  );
};

function App() {
  return (
    <div className=" h-screen w-full flex justify-center items-center">
      <Timers />
    </div>
  );
}

export default App;
