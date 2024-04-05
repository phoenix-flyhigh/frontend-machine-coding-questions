import { useEffect, useState } from "react";
import { HiArrowsRightLeft } from "react-icons/hi2";
import Dropdown from "./Dropdown";

enum Status {
  LOADING,
  SUCCESS,
  ERROR,
  INITIAL,
}

const CurrencyConverter = () => {
  const [currencies, setCurrencies] = useState<string[]>([]);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("INR");
  const [amount, setAmount] = useState(1);
  const [convertedAmount, setConvertedAmount] = useState("");
  const [apiStatus, setApiStatus] = useState(Status.INITIAL);
  const [favorites, setFavorites] = useState<string[]>(
    JSON.parse(localStorage.getItem("favorites") ?? "[]")
  );

  const fetchCurrencies = async () => {
    await fetch("https://api.frankfurter.app/currencies")
      .then(async (res) => {
        const data = await res.json();
        setCurrencies(Object.keys(data));
      })
      .catch((e) => console.log(e));
  };

  const convertCurrency = async () => {
    setApiStatus(Status.LOADING);
    await fetch(
      `https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`
    )
      .then(async (res) => {
        const data = await res.json();
        setConvertedAmount(`${data.rates[toCurrency]} ${toCurrency}`);
        setApiStatus(Status.SUCCESS);
      })

      .catch(() => setApiStatus(Status.ERROR));
  };

  const swapCurrency = () => {
    setToCurrency(fromCurrency);
    setFromCurrency(toCurrency);
  };

  const handleFavorites = (currency: string) => {
    let updatedFavorites = [...favorites];

    if (favorites.includes(currency)) {
      updatedFavorites = updatedFavorites.filter((item) => item !== currency);
    } else {
      updatedFavorites.push(currency);
    }

    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  useEffect(() => {
    fetchCurrencies();
  }, []);

  return (
    <div className="rounded-md bg-white flex flex-col gap-8 p-6 min-w-96">
      <h1 className="text-2xl font-bold">Currency converter</h1>
      <form className="flex justify-between w-full items-center gap-8">
        <Dropdown
          title="From:"
          currencies={currencies}
          currency={fromCurrency}
          setCurrency={setFromCurrency}
          favorites={favorites}
          handleFavorites={handleFavorites}
        />
        <button
          type="button"
          onClick={swapCurrency}
          className="self-end bg-gray-200 rounded-full cursor-pointer flex items-center justify-center p-3"
        >
          <HiArrowsRightLeft />
        </button>
        <Dropdown
          title="To:"
          currencies={currencies}
          currency={toCurrency}
          setCurrency={setToCurrency}
          favorites={favorites}
          handleFavorites={handleFavorites}
        />
      </form>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          convertCurrency();
        }}
        className="w-full flex flex-col items-start gap-4"
      >
        <label htmlFor="amount" className="text-md font-semibold">
          Amount
        </label>
        <input
          id="amount"
          type="number"
          min={1}
          step={0.01}
          required
          value={amount}
          className="bg-gray-200 p-2 rounded-md focus:outline-none focus:ring-2 ring-indigo-500 ring-offset-2 w-full overflow-scroll"
          onChange={(e) => setAmount(Number(e.target.value))}
        />
        <button
          type="submit"
          className={`bg-indigo-500 text-white rounded-lg focus:ring-2 ring-offset-2 ring-indigo-500 px-4 py-2 self-end ${
            apiStatus === Status.LOADING && "animate-pulse"
          }`}
        >
          Convert
        </button>
      </form>

      {apiStatus === Status.SUCCESS && (
        <p className="self-end text-xl text-green-500">
          Converted amount: {convertedAmount}
        </p>
      )}
      {apiStatus === Status.ERROR && (
        <p className="self-end text-xl text-red-500">Error in conversion</p>
      )}
    </div>
  );
};

export default CurrencyConverter;
