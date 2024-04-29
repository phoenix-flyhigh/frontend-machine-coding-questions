const DisplayNestedObject = ({ nestedObject }: { nestedObject: any }) => {
  return (
    <div>
      {Object.entries(nestedObject).map(([key, value]) => {
        if (typeof value === "object") {
          return (
            <div key={key}>
              {`${key}: `}
              <div className="pl-16">
                <DisplayNestedObject nestedObject={value} />
              </div>
            </div>
          );
        } else {
          return <div key={key}>{`${key} : ${value}`}</div>;
        }
      })}
    </div>
  );
};

function App() {
  const nestedObjected = {
    taxi: "a car licensed to transport passengers in return for payment of a fare",
    food: {
      sushi:
        "a traditional Japanese dish of prepared rice accompanied by seafood and vegetables",
      apple: {
        Honeycrisp:
          "an apple cultivar developed at the MAES Horticultural Research Center",
        Fuji: "an apple cultivar developed by growers at Tohoku Research Station",
      },
    },
  };

  return (
    <div className="bg-black text-white h-screen w-full flex justify-center items-center">
      <DisplayNestedObject nestedObject={nestedObjected} />
    </div>
  );
}

export default App;
