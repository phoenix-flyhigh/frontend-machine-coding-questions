import { useEffect, useRef, useState } from "react";
import "./App.css";
import { FaLongArrowAltDown, FaLongArrowAltUp } from "react-icons/fa";
import { useDebounce } from "./useDebounce";

type Currency = "USD" | "EUR" | "GBP" | "CNY" | "JPY";
type Difference = { value: number; increase: boolean };

function App() {
  const [inputValue, setInputValue] = useState<number | null>(null);
  const [currency, setCurrency] = useState<Currency>("USD");
  const [result, setResult] = useState<number | null>(null);
  const [difference, setDifference] = useState<Difference | null>(null);
  const debouncedInputValue = useDebounce(inputValue, 500);
  const debouncedCurrency = useDebounce(currency, 500);
  const retryCount = useRef(5);
  const [error, setError] = useState(false);

  const handleChange = (value: number, currency: Currency) => {
    if (value === 0) return;
    fetch(`https://api.frontendeval.com/fake/crypto/${currency.toLowerCase()}`)
      .then((res) => res.json())
      .then((data) => {
        const previousValue = result;
        const newResult = data.value * value;
        const diff = newResult - (previousValue ?? 0);

        setDifference({
          value: Math.abs(diff),
          increase: diff > 0 ? true : false,
        });
        setResult(newResult);
      })
      .catch(() => {
        if (retryCount.current > 0) {
          setTimeout(() => {
            retryCount.current -= 1;
            handleChange(value, currency);
          }, 1000);
        } else {
          setError(true);
        }
      });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (inputValue && currency) {
        handleChange(inputValue, currency);
      }
    }, 10000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    handleChange(debouncedInputValue, debouncedCurrency);
  }, [debouncedCurrency, debouncedInputValue]);

  return (
    <div className="bg-black h-screen text-white w-full flex justify-center items-center">
      <div className="flex flex-col gap-8 items-center">
        {error && (
          <p className="text-md text-red-500">
            Failed to get rates. Try again after sometime!
          </p>
        )}
        <div className="flex items-center justify-center gap-6">
          <form>
            <input
              type="number"
              value={inputValue ? inputValue.toString() : ""}
              onChange={(e) => {
                setInputValue(Number(e.target.value));
              }}
              className="bg-black border-2 border-white"
            />
          </form>
          <select
            className="bg-black border-2 border-white w-32"
            value={currency}
            onChange={(e) => {
              setCurrency(e.target.value as Currency);
            }}
          >
            <option value="USD" className="w-32">
              USD
            </option>
            <option value="EUR" className="w-32">
              EUR
            </option>
            <option value="GBP" className="w-32">
              GBP
            </option>
            <option value="CNY" className="w-32">
              CNY
            </option>
            <option value="JPY" className="w-32">
              JPY
            </option>
          </select>
        </div>
        <div className="flex items-center justify-center gap-6">
          {result !== null && <span>{result.toFixed(3)}</span>}
          <span>WUC</span>
          {difference !== null && (
            <p className="flex gap-3 items-center">
              {difference.increase ? (
                <FaLongArrowAltUp className="text-green-500" />
              ) : (
                <FaLongArrowAltDown className="text-red-500" />
              )}
              <span>{difference.value.toFixed(3)}</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
