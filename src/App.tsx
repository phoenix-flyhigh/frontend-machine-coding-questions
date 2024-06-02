import React, { useRef, useState } from "react";
import "./App.css";
import { useOutsideClick } from "./hooks/useOutsideClick";
import { useMediaQuery } from "./hooks/useMediaQuery";
import { useDebounce } from "./hooks/useDebounce";
import { useThrottle } from "./hooks/useThrottle";
import { useCustomCallback } from "./hooks/useCustomCallback";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const isLargeScreen = useMediaQuery("(min-width: 1024px)");

  const [clickCount, setClickCount] = useState(0);

  useOutsideClick(modalRef, () => {
    setIsOpen(false);
  });

  const debounced = useDebounce(clickCount,
    5000
  );
  const throttled = useThrottle(clickCount,
    3000
  );

  const handleClick = useCustomCallback(() => {
    console.log(debounced);
    
    setClickCount((prev) => prev + 1);
  }, [debounced]);

  return (
    <div className="bg-black h-screen w-full flex flex-col gap-6 justify-center items-center text-white">
      <button onClick={handleClick}>Click me !!</button>
      <p>Click count: {clickCount}</p>
      <p>Debounced click count: {debounced}</p>
      <p>Throttled click count: {throttled}</p>
      <button onClick={() => setIsOpen(true)}>Open modal</button>
      {isOpen && (
        <div className="fixed inset-0 p-4 z-50 flex items-center justify-center w-full h-full bg-opacity-50">
          <div
            className="bg-white text-black relative flex flex-col gap-6 p-6 items-start w-96 h-72 rounded-xl shadow-lg"
            ref={modalRef}
          >
            This is a {isLargeScreen ? "large" : "small"} modal
            <button
              className="absolute top-4 right-4"
              onClick={() => setIsOpen(false)}
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
