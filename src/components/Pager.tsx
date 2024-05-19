import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface PagerProps {
  showPreviousBtn: boolean;
  showNextBtn: boolean;
  pageCount: number;
  selectedPage: number;
  onSelect: (val: number) => void;
}

const Pager = ({
  showPreviousBtn,
  showNextBtn,
  pageCount,
  onSelect,
  selectedPage,
}: PagerProps) => {
  return (
    <div className="w-full flex justify-end">
      {showPreviousBtn && (
        <button
          className="pager-btn"
          onClick={() => onSelect(selectedPage - 1)}
        >
          <FaChevronLeft />
        </button>
      )}
      {[...Array(pageCount)].map((_, i) => (
        <button
          className={` ${selectedPage === i + 1 ? "selected" : ""} pager-btn`}
          key={i + 1}
          onClick={() => onSelect(i + 1)}
        >
          {i + 1}
        </button>
      ))}
      {showNextBtn && (
        <button
          className="pager-btn"
          onClick={() => onSelect(selectedPage + 1)}
        >
          <FaChevronRight />
        </button>
      )}
    </div>
  );
};

export default Pager;
