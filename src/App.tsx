import React, { FormEvent, useState } from "react";
import "./App.css";

const INITIAL_LIST = [
  { name: "Tomatoes", price: 5.0 },
  { name: "Basil", price: 2.5 },
  { name: "Mozzarella", price: 9.99 },
];

interface cartItem {
  name: string;
  price: number;
}

const ItemValueList = () => {
  const EMPTY_ITEM = { name: "", price: 0 };
  const [itemToAdd, setItem] = useState<cartItem>(EMPTY_ITEM);
  const [cartItems, setCartItems] = useState<cartItem[]>(INITIAL_LIST);

  const removeItem = (itemName: string) => {
    setCartItems(cartItems.filter((item) => item.name !== itemName));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (itemToAdd.name.trim().length <= 0) {
      alert("Enter valid product name");
      return;
    }
    if (itemToAdd.price <= 0.0) {
      alert("Enter valid product price");
      return;
    }
    setCartItems((prev) => [
      ...prev.filter((item) => item.name !== itemToAdd.name),
      itemToAdd,
    ]);
    setItem(EMPTY_ITEM);
  };

  return (
    <div className="flex flex-col gap-24 w-full h-full items-center justify-center">
      <form onSubmit={handleSubmit}>
        <input
          className="border-2 border-black w-40"
          type="text"
          required
          value={itemToAdd.name}
          onChange={(e) =>
            setItem((prev) => ({ ...prev, name: e.target.value }))
          }
        />
        <input
          className="border-2 border-black w-40"
          type="number"
          required
          step={0.01}
          min={0}
          value={itemToAdd.price}
          onChange={(e) =>
            setItem((prev) => ({ ...prev, price: parseFloat(e.target.value) }))
          }
        />
        <button
          type="submit"
          className="border-2 border-black bg-gray-100 px-4"
        >
          Submit
        </button>
      </form>
      <div className="flex flex-col gap-4">
        {cartItems.map((item) => (
          <div className="grid grid-cols-3 gap-4 w-96" key={item.name}>
            <p className="col-span-1">{item.name}</p>
            <p className="col-span-1">${item.price}</p>
            <button
              className="col-span-1 text-red-600 text-semibold"
              onClick={() => removeItem(item.name)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

function App() {
  return (
    <div className="h-screen w-full flex justify-center items-center">
      <ItemValueList />
    </div>
  );
}

export default App;
