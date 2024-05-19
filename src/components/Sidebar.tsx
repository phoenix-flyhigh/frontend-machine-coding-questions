import StarRating from "./StarRating";
import { FilterState, SortOrder } from "../Interfaces";

interface SideBarProps {
  allCategories: string[];
  filters: FilterState;
  clearFilters: () => void;
  handleSort: (sortType: SortOrder) => void;
  selectCategory: (selectedCategory: string) => void;
  changeRating: (chosenRating: number) => void;
}

const Sidebar = ({
  allCategories,
  filters,
  clearFilters,
  handleSort,
  selectCategory,
  changeRating,
}: SideBarProps) => {
  const { sortOrder, categories, rating } = filters;

  return (
    <section className="flex flex-col gap-8 w-1/5">
      <h2 className="text-lg font-bold">Filter Products</h2>
      <form className="flex flex-col gap-3 items-start" onSubmit={clearFilters}>
        <label htmlFor="ascending" className="flex gap-3 items-center">
          <input
            type="radio"
            checked={sortOrder === SortOrder.ASC}
            id="ascending"
            onChange={() => handleSort(SortOrder.ASC)}
          />
          Ascending
        </label>
        <label htmlFor="descending" className="flex gap-3 items-center">
          <input
            type="radio"
            checked={sortOrder === SortOrder.DESC}
            id="descending"
            onChange={() => handleSort(SortOrder.DESC)}
          />
          Descending
        </label>
        <h3 className="text-md font-semibold">Categories</h3>
        {allCategories.map((x) => (
          <label htmlFor={x} className="flex gap-3 items-center" key={x}>
            <input
              type="checkbox"
              id={x}
              checked={categories.some((c) => c === x)}
              onChange={() => selectCategory(x)}
            />
            {x}
          </label>
        ))}
        <div className="flex gap-3 items-center font-semibold">
          Rating
          <StarRating rating={rating} changeRating={changeRating} />
        </div>
        <button
          type="submit"
          className="bg-gray-600 text-white w-full flex items-center justify-center py-2"
        >
          Clear filters
        </button>
      </form>
    </section>
  );
};

export default Sidebar;
