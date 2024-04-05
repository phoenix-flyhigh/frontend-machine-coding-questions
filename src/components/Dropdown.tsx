import { HiOutlineStar, HiStar } from "react-icons/hi2";

interface DropdownProps {
  title: string;
  currencies: string[];
  currency: string;
  setCurrency: (value: string) => void;
  favorites: string[];
  handleFavorites: (currency: string) => void;
}

const Dropdown = ({
  currencies,
  title,
  currency,
  setCurrency,
  favorites,
  handleFavorites,
}: DropdownProps) => {
  const currenciesSet = new Set(currencies);
  favorites.forEach((item) => currenciesSet.delete(item));

  const isFavorite = favorites.includes(currency);

  return (
    <div className="flex flex-col gap-2 items-start">
      <label htmlFor={title}>{title}</label>
      <div className="w-full relative">
        <select
          id={title}
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          className="bg-gray-200 p-2 rounded-md focus:outline-none focus:ring-2 ring-indigo-500 ring-offset-2 w-48 overflow-scroll"
        >
          {favorites.map((item) => (
            <option value={item} key={item} className="bg-white">
              {item}
            </option>
          ))}
          {[...currenciesSet].map((item) => (
            <option value={item} key={item} className="bg-gray-200">
              {item}
            </option>
          ))}
        </select>
        <button
          type="button"
          className="absolute flex items-center justify-center inset-y-0 right-5"
          onClick={() => handleFavorites(currency)}
        >
          {isFavorite ? <HiStar /> : <HiOutlineStar />}
        </button>
      </div>
    </div>
  );
};

export default Dropdown;
