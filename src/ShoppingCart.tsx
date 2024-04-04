import { useEffect, useState } from "react";

const INITIAL_CART = [
  { id: 1, name: "Banana", price: 0.5, quantity: 1 },
  { id: 2, name: "Avocado", price: 3.0, quantity: 2 },
];

const checkCode = (promocode: string) => {
  const allowedCode = "BOGOCODE";

  const applied = promocode === allowedCode;

  const msg = applied
    ? "Your promocode was successfully applied."
    : "The entered code is incorrect.";
  return { bool: applied, msg: msg };
};

const ShoppingCart = () => {
  const [cartItems, setCartItems] = useState(INITIAL_CART);
  const [modalOpen, setModalOpen] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [promoApplied, setPromoApplied] = useState<{
    bool: boolean;
    msg: null | string;
  }>({ bool: false, msg: null });

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      return (total += promoApplied.bool
        ? (Math.floor(item.quantity / 2) + (item.quantity % 2)) * item.price
        : item.quantity * item.price);
    }, 0);
  };

  const updateQuantity = (itemId: number, updatedQuantity: number) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.id === itemId ? { ...item, quantity: updatedQuantity } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  useEffect(() => {
    if (promoApplied.msg === null) return;
    setModalOpen(true);
    setTimeout(() => {
      setModalOpen(false);
    }, 1500);
  }, [promoApplied]);

  return (
    <section className="bg-gray-100 flex flex-col gap-4 items-center justify-center w-96 h-96 p-4">
      <h1 className="text-semibold text-lg">Shopping Cart</h1>
      {cartItems.map((item) => (
        <div className="flex justify-between w-full">
          <p>
            {item.name} - ${item.price}
          </p>
          <input
            className="w-10 ml-4"
            type="number"
            value={item.quantity}
            onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
          />
        </div>
      ))}
      <p className="text-left w-full">Total: ${calculateTotal()}</p>

      <div className="w-full mt-10">
        {promoApplied.bool ? (
          <p>Promo applied</p>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setPromoApplied(checkCode(userInput.trim().toUpperCase()));
            }}
            className="flex justify-between w-full"
          >
            <input
              type="text"
              onChange={(e) => setUserInput(e.target.value)}
              className="w-full"
            />
            <button
              className="bg-blue-500 text-white rounded-md px-3 ml-4"
              type="submit"
            >
              Submit
            </button>
          </form>
        )}
      </div>
      {modalOpen && (
        <div className="bg-blue-500 border-black border-2 rounded-lg p-4 text-center mx-4 absolute flex justify-center items-center self-center">
          {promoApplied.msg}
        </div>
      )}
    </section>
  );
};

export default ShoppingCart;
