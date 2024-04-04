import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";

const ONE =
  "https://images.pexels.com/photos/2249528/pexels-photo-2249528.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";
const TWO =
  "https://images.pexels.com/photos/1061141/pexels-photo-1061141.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";
const THREE =
  "https://images.pexels.com/photos/2249530/pexels-photo-2249530.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";
const FOUR =
  "https://images.pexels.com/photos/1061139/pexels-photo-1061139.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";
const FIVE =
  "https://images.pexels.com/photos/1010973/pexels-photo-1010973.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";
const SIX =
  "https://images.pexels.com/photos/4772874/pexels-photo-4772874.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";

const generateRandomNumber = () => Math.floor(Math.random() * 5 + 1);

const Captcha = ({
  setUnlocked,
}: {
  setUnlocked: (state: boolean) => void;
}) => {
  const imageMap = [
    { id: 1, src: ONE },
    { id: 2, src: TWO },
    { id: 3, src: THREE },
    { id: 4, src: FOUR },
    { id: 5, src: FIVE },
    { id: 6, src: SIX },
  ];

  const [currentNumber, setCurrentNumber] = useState<number | null>(null);
  const [modalOpen, setModalOpen] = useState(true);

  const checkAnswer = (id: number) => {
    if (id === currentNumber) {
      setModalOpen(false);
      setUnlocked(true);
    } else {
      setCurrentNumber(generateRandomNumber());
    }
  };

  useEffect(() => {
    setCurrentNumber(generateRandomNumber());
  }, []);

  return (
    <div className="flex justify-center items-center">
      {modalOpen && (
        <div className="flex flex-col gap-8 items-center absolute self-center z-10 mt-100">
          <p>Select {currentNumber}</p>
          <div className="grid grid-cols-3">
            {imageMap.map((item) => (
              <button onClick={() => checkAnswer(item.id)}>
                <img
                  src={item.src}
                  alt={`image-${item.id}`}
                  className="w-32 h-32"
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

function Home() {
  return (
    <div className="h-screen w-full flex justify-center items-center">
      <Link to="/protected-page">
        <button className="py-2 px-4 border-4 border-black bg-gray-100 rounded-md">
          Go to protected page
        </button>
      </Link>
    </div>
  );
}

function ProtectedPage() {
  const [unlocked, setUnlocked] = useState(false);
  return (
    <div className="h-screen w-full flex justify-center items-center">
      {unlocked ? <div>secret</div> : <Captcha setUnlocked={setUnlocked} />}
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/protected-page" element={<ProtectedPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
