import { KeyboardEvent, useEffect, useRef, useState } from "react";
import "./App.css";
import { useDebounce } from "./hooks/useDebounce";

interface User {
  id: number;
  firstName: string;
  lastName: string;
  image: string;
}

const MultiSelectSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState<User[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const [selectedUserIds, setSelectedUserIds] = useState<Set<number>>(
    new Set()
  );
  const [activeSuggestion, setActiveSuggestion] = useState(-1);
  const debouncedSearchTerm = useDebounce(searchTerm, 700);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    if (debouncedSearchTerm.length === 0) {
      return;
    }

    const fetchSuggestions = () => {
      fetch(`https://dummyjson.com/users/search?q=${debouncedSearchTerm}`, {
        signal,
      })
        .then((res) => res.json())
        .then((data) => setSuggestions(data.users));
    };

    if (debouncedSearchTerm.trim().length > 0) {
      fetchSuggestions();
      setActiveSuggestion(-1);
    } else {
      setSuggestions([]);
    }
  }, [debouncedSearchTerm]);

  const handleUserSelect = (user: User) => {
    setSelectedUsers((prev) => [...prev, user]);
    setSelectedUserIds((prev) => new Set([...prev, user.id]));
    setSuggestions([]);
    setSearchTerm("");
    inputRef.current?.focus();
  };

  const removeSelectedUser = (user: User) => {
    setSelectedUsers((prev) => prev.filter((s) => s.id !== user.id));

    const updatedSelectedUserIds = new Set(selectedUserIds);
    updatedSelectedUserIds.delete(user.id);
    setSelectedUserIds(updatedSelectedUserIds);
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (
      e.key === "Backspace" &&
      e.target.value === "" &&
      selectedUsers.length > 0
    ) {
      removeSelectedUser(selectedUsers[selectedUsers.length - 1]);
    } else if (e.key === "ArrowDown" && suggestions.length > 0) {
      e.preventDefault();
      setActiveSuggestion((prev) =>
        prev < suggestions.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === "ArrowUp" && suggestions.length > 0) {
      e.preventDefault();
      setActiveSuggestion((prev) => (prev > 0 ? prev - 1 : 0));
    } else if (
      e.key === "Enter" &&
      activeSuggestion >= 0 &&
      activeSuggestion < suggestions.length
    ) {
      handleUserSelect(suggestions[activeSuggestion]);
    }
  };

  return (
    <div className="flex flex-col p-4 w-full">
      <div className="w-full h-16 rounded-full border-black border-2 p-3 flex flex-wrap gap-4 items-center justify-start">
        {selectedUsers.map((user) => (
          <button
            className="flex gap-3 bg-black text-white p-2 px-4 rounded-full items-center"
            onClick={() => removeSelectedUser(user)}
            key={user.id}
          >
            <img
              src={user.image}
              alt={`${user.firstName} ${user.lastName}`}
              className="w-4 h-4"
            />
            <span>
              {user.firstName} {user.lastName} &times;
            </span>
          </button>
        ))}
        <input
          ref={inputRef}
          type="text"
          className="focus:outline-none border-none"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for user..."
          onKeyDown={(e) => handleKeyPress(e)}
        />
      </div>
      <ul className="max-h-80 overflow-y-scroll border-l-2 border-r-2 border-t-2 rounded-xl">
        {[...suggestions.filter((s) => !selectedUserIds.has(s.id))].map(
          (s, index) => (
            <li
              key={s.id}
              className={`p-2 border-b-2 hover:bg-gray-200 cursor-pointer flex gap-3 items-center ${
                activeSuggestion === index && "bg-gray-200"
              }`}
            >
              <button
                className="flex gap-4 w-full"
                onClick={() => handleUserSelect(s)}
              >
                <img
                  src={s.image}
                  alt={`${s.firstName} ${s.lastName}`}
                  className="w-8 h-8"
                />
                <span>
                  {s.firstName} {s.lastName}
                </span>
              </button>
            </li>
          )
        )}
      </ul>
    </div>
  );
};

function App() {
  return (
    <div className="h-screen w-full flex justify-center">
      <MultiSelectSearch />
    </div>
  );
}

export default App;
