import { ReactNode, HTMLAttributes } from "react";
import { IoChevronUpOutline, IoChevronDownOutline } from "react-icons/io5";

const AccordionSummary = ({
  children,
  id,
  isExpanded,
  ...props
}: {
  id: string;
  isExpanded?: boolean;
  children: ReactNode;
  props?: HTMLAttributes<HTMLDivElement>;
}) => {
  return (
    <button
      {...props}
      id={id}
      className={`bg-white text-black p-3 w-full hover:bg-gray-200 focus:bg-gray-200 text-left ${
        isExpanded ? "rounded-t-lg border-b-2 border-black" : "rounded-lg"
      } flex justify-between items-center`}
    >
      {children}
      {isExpanded ? <IoChevronUpOutline /> : <IoChevronDownOutline />}
    </button>
  );
};

export default AccordionSummary;
