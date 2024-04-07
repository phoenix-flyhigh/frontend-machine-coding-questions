import { ReactNode, useState } from "react";
import "./App.css";

type Submithandler = (obj: { rating: number }) => void;
interface FeedbackWrapperProps {
  onSubmit: Submithandler;
  children: ReactNode;
}

const RatingDescription = {
  "1": "Unsatisfied",
  "2": "Somewhat satisfied",
  "3": "Satisfied",
  "4": "Very satisfied",
  "5": "Extremely satisfied",
};

const FeedbackWrapper = ({ onSubmit, children }: FeedbackWrapperProps) => {
  const [clickCount, setClickCount] = useState(0);
  const [rating, setRating] = useState("4");

  return clickCount >= 3 ? (
    <div className="flex flex-col justify-center items-center w-[90%] h-72 bg-orange-300">
      <form
        className="flex flex-col justify-center items-center gap-8"
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit({ rating: parseInt(rating) });
          setClickCount(0);
        }}
      >
        <div className="flex gap-8 w-80 items-center justify-start">
          <input
            type="range"
            min={1}
            max={5}
            step={1}
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            className="cursor-pointer m-0"
          />
          <span>
            {RatingDescription[rating as keyof typeof RatingDescription]}
          </span>
        </div>
        <button className="cursor-pointer border border-black px-2 py-1 rounded-md bg-gray-100 ">
          Submit
        </button>
      </form>
    </div>
  ) : (
    <div
      id="feedback-wrapper"
      onClick={() => setClickCount((prev) => prev + 1)}
    >
      {children}
    </div>
  );
};

function App() {
  return (
    <div className="h-screen w-full flex justify-center items-center">
      <FeedbackWrapper
        onSubmit={(obj: { rating: number }) => {
          alert(`Rating from modal: ${obj.rating}`);
        }}
      >
        {/* UI composed of three no-op buttons */}
        <div style={{ display: "flex", marginBottom: 10 }}>
          <button>A button</button>
          <button>Another button</button>
        </div>
        <button style={{ padding: 20 }}>A bigger button</button>
      </FeedbackWrapper>
    </div>
  );
}

export default App;
