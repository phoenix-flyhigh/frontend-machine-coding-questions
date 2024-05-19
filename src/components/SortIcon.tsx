import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { SortOrder } from "../Interfaces";

interface SortIconProps {
  sortParameter: string | null;
  sortingOrder: SortOrder | null;
  header: string;
}

const SortIcon = ({ sortParameter, sortingOrder, header }: SortIconProps) => {
  return sortParameter === header ? (
    sortingOrder === SortOrder.ASC ? (
      <FaChevronDown />
    ) : (
      <FaChevronUp />
    )
  ) : (
    <div className="text-lg font-bold">-</div>
  );
};

export default SortIcon;
