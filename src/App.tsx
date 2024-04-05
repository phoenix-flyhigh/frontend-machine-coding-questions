import { useEffect, useState } from "react";
import "./App.css";

const useBitcon = () => {
  const [value, setValue] = useState<number | null>(null);

  // should call an external api in a real world scenario
  const fetchPrice = async () => {
    return setValue(Number((Math.random() * 700).toPrecision(4)));
  };

  useEffect(() => {
    fetchPrice();

    const interval = setInterval(() => {
      fetchPrice();
    }, 7000);

    return () => clearInterval(interval);
  }, []);

  return value;
};

function App() {
  const value: number | null = useBitcon();

  return (
    <div className="bg-black h-screen w-full flex justify-center items-center text-white">
      {value ? (
        <p className="text-green-300 text-lg">Bitcoin price ${value} USD</p>
      ) : (
        <p className="text-lg">Fetching price...</p>
      )}
    </div>
  );
}

export default App;
