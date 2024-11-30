import { useState } from "react";
import { AutoSuggest } from "./AutoSuggest";
import { CartItem } from "./CartItem";

export type TCartItem = { id: number; name: string; isCompleted: boolean };

const uuid = (() => {
  let i = 1;
  return () => i++;
})();

const ShoppingCart = () => {
  const [items, setItems] = useState<TCartItem[]>([
    { id: uuid(), name: "Milk", isCompleted: false },
    { id: uuid(), name: "Cake", isCompleted: true },
    { id: uuid(), name: "Bread", isCompleted: false },
  ]);

  const addItem = (name: string) => {
    const newItem: TCartItem = { id: uuid(), name, isCompleted: false };
    setItems((prev) => [...prev, newItem]);
  };

  const removeItem = (itemToRemoveId: number) => {
    setItems((prev) => prev.filter((item) => item.id !== itemToRemoveId));
  };

  const completeItem = (itemToCompleteId: number) => {
    setItems((prev) =>
      prev.map((item: TCartItem) =>
        item.id === itemToCompleteId ? { ...item, isCompleted: true } : item
      )
    );
  };

  const inCompleteItem = (itemToIncompleteId: number) => {
    setItems((prev) =>
      prev.map((item: TCartItem) =>
        item.id === itemToIncompleteId ? { ...item, isCompleted: false } : item
      )
    );
  };

  const fetchSuggestions = async (query: string) => {
    console.log(query);
    return await fetch(`https://api.frontendeval.com/fake/food/${query}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        return data;
      });
  };

  return (
    <div className="w-full flex flex-col gap-6 items-center">
      <h1 className="text-4xl font-semibold">Shopping Cart</h1>
      <AutoSuggest onSelect={addItem} fetchSuggestions={fetchSuggestions} />
      <ul className="flex flex-col list-none gap-4 w-1/5">
        {items.map((item) => (
          <CartItem
            key={item.id}
            item={item}
            onRemove={removeItem}
            onComplete={completeItem}
            onIncomplete={inCompleteItem}
          />
        ))}
      </ul>
    </div>
  );
};





export default ShoppingCart;
