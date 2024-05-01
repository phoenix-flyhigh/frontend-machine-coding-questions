import { useState } from "react";
import { slides } from "./slides";
import { FiArrowLeft } from "react-icons/fi";
import { FiArrowRight } from "react-icons/fi";

function App() {
  const [selectedSlide, setSelectedSlide] = useState(0);

  const prevSlide = () => {
    if (selectedSlide === 0) {
      setSelectedSlide(slides.length - 1);
    } else setSelectedSlide((prev) => prev - 1);
  };

  const nextSlide = () => {
    if (selectedSlide === slides.length - 1) {
      setSelectedSlide(0);
    } else setSelectedSlide((prev) => prev + 1);
  };

  return (
    <div className="bg-black h-screen w-full flex justify-center items-center">
      <div className="relative flex items-center justify-center">
        {slides.map(({ src, alt }, index) => (
          <img
            key={alt}
            src={src}
            alt="alt"
            className={`${
              selectedSlide === index ? "block" : "hidden"
            } rounded-xl`}
          />
        ))}
        <button
          className={"absolute bg-white rounded-full p-3 z-10 left-4"}
          onClick={() => prevSlide()}
        >
          <FiArrowLeft />
        </button>
        <button
          className={"absolute bg-white rounded-full p-3 z-10 right-4"}
          onClick={() => nextSlide()}
        >
          <FiArrowRight />
        </button>
        <div className="absolute flex gap-2 items-center bottom-4">
          {slides.map((_, i) => (
            <button
              className={`${
                i === selectedSlide ? "bg-white" : "bg-gray-500"
              } rounded-full p-1`}
              onClick={() => setSelectedSlide(i)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
