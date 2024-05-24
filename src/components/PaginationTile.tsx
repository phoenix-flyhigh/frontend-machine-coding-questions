import { Dispatch, SetStateAction, useMemo } from "react";
import { getPaginationRange } from "../utils";
import "../App.css";

interface PaginationTileProps {
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  limit: number;
  setLimit: Dispatch<SetStateAction<number>>;
  totalPages: number;
}

const PaginationTile = ({
  currentPage,
  setCurrentPage,
  limit,
  setLimit,
  totalPages,
}: PaginationTileProps) => {
  const handlePage = (pageNumber: number) => {
    if (pageNumber < 1 || pageNumber > totalPages) {
      return;
    }
    setCurrentPage(pageNumber);
  };

  const pageRange = useMemo(
    () => getPaginationRange(totalPages, currentPage, 1),
    [totalPages, currentPage]
  );

  return (
    <div className="flex items-center gap-6 self-end">
      <select
        value={limit}
        onChange={(e) => setLimit(Number(e.target.value))}
        className="border-2 border-black p-3"
      >
        <option value={5}>5</option>
        <option value={10}>10</option>
        <option value={15}>15</option>
      </select>
      <ul className="flex items-center border-l-2 border-slate-400">
        <li className="page-btn" role="button" onClick={() => handlePage(1)}>
          &laquo;
        </li>
        <li
          className="page-btn"
          role="button"
          onClick={() => handlePage(currentPage - 1)}
        >
          &lsaquo;
        </li>
        {pageRange.map((x) => (
          <li
            className={`${x === currentPage ? "selected" : ""} page-btn`}
            role="button"
            key={x}
            onClick={() => {
              if (x === " ...") {
                handlePage(currentPage + 1);
              } else if (x === "... ") {
                handlePage(currentPage - 1);
              } else {
                handlePage(Number(x));
              }
            }}
          >
            {x}
          </li>
        ))}
        <li
          className="page-btn"
          role="button"
          onClick={() => handlePage(currentPage + 1)}
        >
          &rsaquo;
        </li>
        <li
          className="page-btn"
          role="button"
          onClick={() => handlePage(totalPages)}
        >
          &raquo;
        </li>
      </ul>
    </div>
  );
};

export default PaginationTile;
