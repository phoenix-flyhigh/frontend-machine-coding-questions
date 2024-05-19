import { useState } from "react";
import { MdOutlineStar, MdOutlineStarBorder } from "react-icons/md";

interface StarRatingProps {
  rating: number;
  changeRating?: (chosenRating: number) => void;
}

const StarRating = ({ rating, changeRating }: StarRatingProps) => {
  const [hoveredRating, setHoveredRating] = useState(0);

  return (
    <div className="flex gap-1 items-center">
      {[...Array(5)].map((_, i) => (
        <button
          type="button"
          key={i}
          onClick={() => {
            changeRating && changeRating(i + 1);
          }}
          onMouseEnter={() => {
            changeRating && setHoveredRating(i + 1);
          }}
          onMouseLeave={() => setHoveredRating(0)}
          disabled={!changeRating}
        >
          {i < rating || i < hoveredRating ? (
            <MdOutlineStar className={"text-yellow-500"} />
          ) : (
            <MdOutlineStarBorder />
          )}
        </button>
      ))}
    </div>
  );
};

export default StarRating;
