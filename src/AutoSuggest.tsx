import { ReactNode, useState, useEffect } from "react";
import { useDebounce } from "./useDebounce";
import { useLocalStorage } from "./useLocalStorage";

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
  const [activeSuggestionId, setActiveSuggestionId] = useState(-1);

  const debouncedInputText = useDebounce<string>(inputText, 500);
  const { getItem, setItem } = useLocalStorage();

  useEffect(() => {
    (async () => {
      if (
        inputText.length < 2 ||
        inputText !== debouncedInputText ||
        !debouncedInputText
      )
        return;
      try {
        setLoading(true);
        setError(false);

        const cachedSuggestions = getItem(debouncedInputText);
        if (cachedSuggestions) {
          setSuggestions(cachedSuggestions);
          return;
        }

        const response = await fetchSuggestions(debouncedInputText);
        setItem(debouncedInputText, response);
        setSuggestions(response);
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
    setActiveSuggestionId(-1);
  };

  const handleKeydown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown" && suggestions.length > 0) {
      setActiveSuggestionId((prev) =>
        prev + 1 >= suggestions.length ? 0 : prev + 1
      );
    }
    if (e.key === "ArrowUp" && suggestions.length > 0) {
      setActiveSuggestionId((prev) =>
        prev - 1 < 0 ? suggestions.length - 1 : prev - 1
      );
    }
    if (
      e.key === "Enter" &&
      suggestions.length > 0 &&
      activeSuggestionId >= 0
    ) {
      handleSelect(suggestions[activeSuggestionId]);
    }
  };

  return (
    <div className="w-1/4 flex flex-col items-center relative">
      <input
        type="text"
        value={inputText}
        onChange={handleInput}
        onKeyDown={handleKeydown}
        className="bg-black p-4 text-xl border-2 border-white rounded-lg w-full"
      />
      <ul className="absolute top-full bg-black z-10 max-h-60 h-fit shadow-md overflow-scroll text-left w-full border-x-2 border-slate-500">
        {loading && (
          <li className="px-4 py-2 border-b-2 border-slate-500">
            Loading suggestions...
          </li>
        )}
        {error && (
          <li className="px-4 py-2 border-b-2 border-slate-500 text-red-500">
            Failed to load suggestions.
          </li>
        )}
        {!loading &&
          !error &&
          suggestions.length > 0 &&
          suggestions.map((s, i) => (
            <li
              key={i}
              onClick={() => handleSelect(s)}
              role="button"
              className={`px-4 py-2 border-b-2 border-slate-500 cursor-pointer ${
                activeSuggestionId === i ? "bg-slate-500" : ""
              }`}
            >
              {highlightText(s, inputText, i)}
            </li>
          ))}
      </ul>
    </div>
  );
};
