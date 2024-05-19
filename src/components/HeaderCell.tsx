import { SortOrder } from "../Interfaces";
import SortIcon from "./SortIcon";

interface HeaderCellProps {
  title: string;
  onSort: () => void;
  sortParameter: string | null;
  sortingOrder: SortOrder | null;
}

const HeaderCell = ({
  onSort,
  sortParameter,
  sortingOrder,
  title,
}: HeaderCellProps) => {
  return (
    <th className="cell" role="button" onClick={onSort}>
      <div className="header-content">
        <span> {title}</span>
        <SortIcon
          header="category"
          sortParameter={sortParameter}
          sortingOrder={sortingOrder}
        />
      </div>
    </th>
  );
};

export default HeaderCell;
