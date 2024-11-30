import { ReactNode, useState, useEffect } from "react";
import { useDebounce } from "./useDebounce";

interface IAutoSuggest {
  onSelect: (itemName: string) => void;
  fetchSuggestions: (query: string) => Promise<string[]>;
}

const highlightText = (
  text: string,
  matcher: string,
  key: number
): ReactNode[] => {
  const parts = text.split(new RegExp(`(${matcher})`, "gi"));
  return parts.map((part) =>
    part.toLowerCase() === matcher.toLowerCase() ? (
      <b key={key} className="text-yellow-600">
        {part}
      </b>
    ) : (
      part
    )
  );
};

export const AutoSuggest = ({ onSelect, fetchSuggestions }: IAutoSuggest) => {
  const [inputText, setInputText] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const debouncedInputText = useDebounce<string>(inputText, 500);

  useEffect(() => {
    (async () => {
      if (inputText.length < 2 || !debouncedInputText) return;
      try {
        setLoading(true);
        setError(false);
        const response = await fetchSuggestions(debouncedInputText);
        if (response) setSuggestions(response);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    })();
  }, [debouncedInputText, fetchSuggestions, inputText]);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value.trim();
    setInputText(text);
    setSuggestions([]);
  };

  const handleSelect = (item: string) => {
    onSelect(item);
    setSuggestions([]);
    setInputText("");
  };

  return (
    <div className="w-1/4 flex flex-col items-center relative">
      <input
        type="text"
        value={inputText}
        onChange={handleInput}
        className="bg-black p-4 text-xl border-2 border-white rounded-lg w-full"
      />
      {suggestions.length > 0 && (
        <ul className="absolute top-full bg-black z-10 max-h-60 h-fit shadow-md overflow-scroll text-left w-full border-x-2 border-slate-500">
          {loading && (
            <li className="px-4 py-2 border-b-2 border-slate-500">
              Loading suggestions...
            </li>
          )}
          {error && (
            <li className="px-4 py-2 border-b-2 border-slate-500">
              Failed to load suggestions...
            </li>
          )}
          {suggestions.map((s, i) => (
            <li
              key={i}
              onClick={() => handleSelect(s)}
              role="button"
              className="px-4 py-2 border-b-2 border-slate-500 cursor-pointer"
            >
              {highlightText(s, inputText, i)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
