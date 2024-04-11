import { useEffect, useRef, useState } from "react";
import "./App.css";

type Step = {
  id: number;
  title: string;
  element: JSX.Element;
};

interface StepperProps {
  steps: Step[];
}

const Stepper = ({ steps }: StepperProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isCompleted, setIsCompleted] = useState(false);
  const [margins, setMargins] = useState({
    marginLeft: 0,
    marginRight: 0,
  });
  const stepsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    setMargins({
      marginLeft: stepsRef.current[1].offsetWidth / 2,
      marginRight: stepsRef.current[steps.length].offsetWidth / 2,
    });
  }, [stepsRef, steps]);

  const handleNext = () => {
    setCurrentStep((prev) => {
      if (prev + 1 === steps.length) {
        setIsCompleted(true);
      }
      return prev + 1;
    });
  };

  return (
    <div className="w-full flex flex-col gap-8">
      <div className="flex justify-between relative mx-6">
        <div
          className={`absolute h-2 bg-gray-200 top-[25%] left-0`}
          style={{
            width: `calc(100% - ${margins.marginLeft + margins.marginRight}px)`,
            marginLeft: margins.marginLeft,
            marginRight: margins.marginRight,
          }}
        >
          <div
            className="bg-green-500 h-full transition ease-out delay-75"
            style={{
              width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
            }}
          ></div>
        </div>
        {steps.map((step) => (
          <div
            className="flex flex-col gap-4 items-center z-10"
            key={step.id}
            ref={(el: HTMLDivElement) => (stepsRef.current[step.id] = el)}
          >
            <p
              className={`rounded-full bg-gray-200 w-12 h-12 flex items-center justify-center
              ${
                currentStep === step.id && !isCompleted
                  ? "bg-blue-500 text-white"
                  : ""
              } ${
                currentStep > step.id || isCompleted
                  ? "bg-green-500 text-white"
                  : ""
              } `}
            >
              {currentStep > step.id || isCompleted ? (
                <span>&#10003;</span>
              ) : (
                step.id
              )}
            </p>
            <p className="text-lg font-semibold">{step.title}</p>
          </div>
        ))}
      </div>
      <div className="self-center text-lg">
        {steps[currentStep - 1].element}
      </div>
      {currentStep === steps.length ? (
        <></>
      ) : (
        <button
          className="bg-gray-200 p-2 border-2 border-black w-36 self-center"
          onClick={handleNext}
        >
          Next
        </button>
      )}
    </div>
  );
};

function App() {
  const steps: Step[] = [
    {
      id: 1,
      title: "Customer info",
      element: <div>Enter your contact information</div>,
    },
    {
      id: 2,
      title: "Shipping info",
      element: <div>Enter your address information</div>,
    },
    {
      id: 3,
      title: "Payment info",
      element: <div>Enter your payment information</div>,
    },
    {
      id: 4,
      title: "Delivered",
      element: <div>Your order has been delivered</div>,
    },
  ];
  return (
    <div className="h-screen w-full flex justify-center items-center">
      <Stepper steps={steps} />
    </div>
  );
}

export default App;
