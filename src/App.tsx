import { useState } from "react";
import "./App.css";

const EMPTY_STAR =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Five-pointed_star.svg/1088px-Five-pointed_star.svg.png";
const FULL_STAR =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Gold_Star.svg/1200px-Gold_Star.svg.png";

const StarRating = () => {
  const starIds = [1, 2, 3, 4, 5];
  const [hovered, setHovered] = useState(0);
  const [clicked, setClicked] = useState(0);

  const isStarSelected = (starId: number) =>
    starId <= hovered || starId <= clicked;

  return (
    <div className="flex gap-6 w-full items-center justify-center">
      {starIds.map((starId) => (
        <button
          onMouseLeave={() => setHovered(0)}
          onMouseEnter={() => {
            if (clicked > starId) {
              setClicked(0);
            }
            setHovered(starId);
          }}
          onClick={() => setClicked(starId)}
        >
          {isStarSelected(starId) ? (
            <img src={FULL_STAR} alt="full-star" />
          ) : (
            <img src={EMPTY_STAR} alt="empty-star" />
          )}
        </button>
      ))}
    </div>
  );
};

function App() {
  return (
    <div className="h-screen w-full flex justify-center items-center">
      <StarRating />
    </div>
  );
}

export default App;
