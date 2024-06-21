import { RxCross1 } from "react-icons/rx";

export const CancelIcon = ({ onClick }: { onClick: () => void }) => {
  return (
    <button
      className="bg-white rounded-full w-8 h-8 p-2 absolute right-2 top-2 text-black flex flex-col items-center justify-center"
      onClick={onClick}
    >
      <RxCross1 />
    </button>
  );
};
