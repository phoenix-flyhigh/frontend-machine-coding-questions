import React, { useState } from "react";
import "./App.css";

interface GridProps {
  config: number[][];
}

const Grid = ({ config }: GridProps) => {
  const [selectedOrder, setSelectedOrder] = useState<number[]>([]);
  const [deactivating, setDeactivating] = useState(false);

  const deactivate = () => {
    setDeactivating(true);

    const timer = setInterval(() => {
      setSelectedOrder((prev) => {
        const newOrder = [...prev];
        newOrder.pop();

        if (newOrder.length === 0) {
          setDeactivating(false);
          clearInterval(timer);
        }
        return newOrder;
      });
    }, 300);
  };

  return (
    <div className={`grid grid-cols-${config[0].length} gap-4 w-3/5`}>
      {config.flat(1).map((box, index) =>
        box ? (
          <button
            key={index}
            onClick={() => {
              const newOrder = [...selectedOrder, index];
              setSelectedOrder(newOrder);

              if (newOrder.length === config.flat().filter(Boolean).length) {
                deactivate();
              }
            }}
            className={`h-0 pt-[100%] border border-black ${
              selectedOrder.includes(index) ? "bg-green-500" : "bg-transparent"
            }`}
            disabled={selectedOrder.includes(index) || deactivating}
          />
        ) : (
          <span />
        )
      )}
    </div>
  );
};

function App() {
  const config = [
    [1, 1, 1],
    [1, 0, 1],
    [1, 1, 1],
  ];

  return (
    <div className="h-screen w-full flex justify-center items-center">
      <Grid config={config} />
    </div>
  );
}

export default App;
