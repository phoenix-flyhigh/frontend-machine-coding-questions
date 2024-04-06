/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import "./App.css";

const CustomCalculator = () => {
  const half = (val: number) => val / 2;
  const double = (val: number) => val * 2;
  const increment = (val: number) => val + 1;
  const decrement = (val: number) => val - 1;

  const [input, setInput] = useState("");
  const [output, setOutput] = useState<number | null>(null);
  const [operations, setOperations] = useState<string[]>([]);

  const calculateResult = () => {
    const result: number = operations.reduce((acc, func) => {
      return eval(func)(acc);
    }, parseFloat(input));
    setOutput(result);
  };

  const clearData = () => {
    setOperations([]);
    setInput("");
    setOutput(null);
  };

  const addOperation = (operation: string) => {
    setOperations((prev) => [...prev, operation]);
  };

  return (
    <div className="flex flex-col gap-8 items-center justify-center">
      <div className="flex gap-8">
        <div className="flex">
          <button className="btn" onClick={() => addOperation("half")}>
            half
          </button>
          <button className="btn" onClick={() => addOperation("double")}>
            double
          </button>
          <button className="btn" onClick={() => addOperation("increment")}>
            increment
          </button>
          <button className="btn" onClick={() => addOperation("decrement")}>
            decrement
          </button>
        </div>
        <button className="btn" onClick={clearData}>
          clear
        </button>
      </div>
      <h1 className="text-2xl font-bold">My Function</h1>
      <div className="flex flex-col gap-2 items-center">
        {operations.map((s) => (
          <p key={s}>{s}</p>
        ))}
      </div>
      <form
        className="my-12 flex"
        onSubmit={(e) => {
          e.preventDefault();
          calculateResult();
        }}
      >
        <input
          type="number"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="border border-black w-56"
          min={-500}
          max={500}
          step={0.001}
          required
        />
        <button type="submit" className="btn">
          Submit
        </button>
      </form>
      <p className="text-xl font-semibold">
        {input === "" ? "?" : input} {"-> My Function ->"} {output ?? "?"}
      </p>
    </div>
  );
};

function App() {
  return (
    <div className="h-screen w-full flex justify-center items-center">
      <CustomCalculator />
    </div>
  );
}

export default App;
