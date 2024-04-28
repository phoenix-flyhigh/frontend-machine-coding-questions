import { useState } from "react";
import "./App.css";
import useCustomEffect from "./hooks/useCustomEffect";

const Counter = () => {
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);

  useCustomEffect(() => {
    console.log("Effect triggered:", count1);
    return () => {
      console.log("cleanup");
    };
  }, [count1]);

  console.log("rerendered");

  const incrementC1 = () => {
    setCount1((prev) => prev + 1);
  };

  const incrementC2 = () => {
    setCount2((prev) => prev + 1);
  };

  return (
    <div className="flex flex-col gap-6">
      <h1>Counter1: {count1}</h1>
      <h1>Counter2: {count2}</h1>
      <button
        onClick={incrementC1}
        className="border-2 bg-gray-300 px-4 py-2 rounded-lg "
      >
        Increment counter 1
      </button>
      <button
        onClick={incrementC2}
        className="border-2 bg-gray-300 px-4 py-2 rounded-lg "
      >
        Increment counter 2
      </button>
    </div>
  );
};

function App() {
  return (
    <div className="h-screen w-full flex justify-center items-center">
      <Counter />
    </div>
  );
}

export default App;
