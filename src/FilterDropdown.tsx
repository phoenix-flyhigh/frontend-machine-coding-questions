import { useMemo, useState } from "react";
import "./App.css";

const FilterDropdown: React.FC = () => {
  const FILTERS: string[] = [
    "Plays a Sport",
    "Likes Pizza",
    "> 1.75m Tall",
    "< 35 Years Old",
  ];

  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState(
    FILTERS.map((filter) => ({
      name: filter,
      enabled: false,
    }))
  );

  const clickFilter = (name: string) => {
    setFilters(
      filters.map((item) => {
        if (item.name === name) {
          return {
            ...item,
            enabled: !item.enabled,
          };
        }
        return { ...item };
      })
    );
  };

  const filtering = useMemo(
    () => filters.find((item) => item.enabled) !== undefined,
    [filters]
  );

  return (
    <div>
      <h1 className="m-4 text-lg font-bold">FilterDropdown</h1>
      <button onClick={() => setIsOpen(!isOpen)} className="filter-title">
        {filtering ? "Filtering" : "Add Filter"}
      </button>
      {isOpen && (
        <div className="filter-options-container">
          {filters.map((item) => (
            <button
              key={item.name}
              className={`filter-option ${item.enabled ? "selected" : ""}`}
              onClick={() => clickFilter(item.name)}
            >
              {item.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default FilterDropdown;
