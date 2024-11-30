import { HiCheck } from "react-icons/hi";
import { TCartItem } from "./ShoppingList";

interface ICartItem {
  item: TCartItem;
  onRemove: (id: number) => void;
  onComplete: (id: number) => void;
  onIncomplete: (id: number) => void;
}

export const CartItem = ({
  item,
  onRemove,
  onComplete,
  onIncomplete,
}: ICartItem) => {
  return (
    <li
      className={`flex justify-between text-xl w-full ${
        item.isCompleted ? "opacity-20" : ""
      }`}
    >
      <section className="flex gap-4 justify-center">
        <button
          onClick={() => {
            item.isCompleted ? onIncomplete(item.id) : onComplete(item.id);
          }}
          className={`bg-black border-2 border-white rounded-full flex justify-center items-center w-8 aspect-square ${
            item.isCompleted ? "border-none" : ""
          }`}
        >
          <HiCheck />
        </button>
        <span className={`${item.isCompleted ? "line-through" : ""}`}>
          {item.name}
        </span>
      </section>
      <button onClick={() => onRemove(item.id)}>X</button>
    </li>
  );
};
