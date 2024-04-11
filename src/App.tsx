import { useState } from "react";
import "./App.css";
import useCustomMemo from "./useCustomMemo";

function App() {
  const [counter, setCounter] = useState(0);
  const [counter2, setCounter2] = useState(0);

  const squared = useCustomMemo(() => {
    console.log(" called");

    return counter * counter;
  }, [counter]);

  return (
    <div className=" h-screen w-full flex flex-col justify-center items-center gap-4">
      <div>Counter {counter}</div>
      <div>Squared counter {squared}</div>
      <button
        className="bg-gray-300 py-3 px-6"
        onClick={() => setCounter((prev) => prev + 1)}
      >
        Increment
      </button>
      <div>Counter2 {counter2}</div>
      <button
        className="bg-gray-300 py-3 px-6"
        onClick={() => setCounter2((prev) => prev + 1)}
      >
        Increment
      </button>
    </div>
  );
}

export default App;
