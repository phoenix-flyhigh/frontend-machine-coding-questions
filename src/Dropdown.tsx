import React, { useState } from "react";

interface DropdownProps {
  options: string[];
  onSelect: (val: string) => void;
  liRefs: React.MutableRefObject<HTMLLIElement[]>;
}

export const Dropdown = React.forwardRef<HTMLLIElement[], DropdownProps>(
  ({ options, onSelect, liRefs }) => {
    const [focusedIndex, setFocusedIndex] = useState(-1);

    const handleKeydown = (e: React.KeyboardEvent<HTMLUListElement>) => {
      if ((e.target as HTMLElement).tagName === "LI" && focusedIndex > -1) {
        e.preventDefault();
        if (e.key === "ArrowDown") {
          if (focusedIndex < options.length - 1) {
            setFocusedIndex((prev) => prev + 1);
            liRefs.current[focusedIndex + 1].focus();
          } else {
            setFocusedIndex(0);
            liRefs.current[0].focus();
          }
        }
        if (e.key === "ArrowUp") {
          if (focusedIndex > 0) {
            setFocusedIndex((prev) => prev - 1);
            liRefs.current[focusedIndex - 1].focus();
          } else {
            setFocusedIndex(options.length - 1);
            liRefs.current[options.length - 1].focus();
          }
        }
        if (e.key === "Enter") {
          onSelect(options[focusedIndex]);
        }
      }
    };

    return (
      <ul
        onKeyDown={handleKeydown}
        className="border-2 border-slate-300 bg-slate-950 border-t-0 max-h-56 h-fit w-full overflow-scroll"
      >
        {options.map((x, index) => (
          <li
            tabIndex={0}
            onFocus={() => setFocusedIndex(index)}
            ref={(el: HTMLLIElement) => (liRefs.current[index] = el)}
            key={x}
            className={`p-3 flex justify-center items-center border-slate-300 cursor-pointer hover:bg-slate-800 focus:bg-slate-800  ${
              options.length - 1 === index ? "border-b-0" : "border-b-2"
            }`}
            onClick={() => onSelect(x)}
          >
            {x}
          </li>
        ))}
      </ul>
    );
  }
);
