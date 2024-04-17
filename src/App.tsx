import { useState } from "react";
import "./App.css";
import { HeartIcon, SpinnerIcon } from "./icons.tsx";

function App() {
  const [liked, setLiked] = useState(false);
  const [fetching, setFetching] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleLike = async () => {
    setError(null);
    setFetching(true);

    await fetch("https://www.greatfrontend.com/api/questions/like-button", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: liked ? "unlike" : "like",
      }),
    }).then(async (res) => {
      if (res.status >= 200 && res.status < 300) {
        setLiked((prev) => !prev);
      } else {
        const data = await res.json();
        setError(data.message);
      }
    });
    setFetching(false);
  };

  return (
    <div className="h-screen w-full flex justify-center items-center flex-col gap-8">
      <button
        className={`rounded-full cursor-pointer flex gap-3 items-center justify-center ${
          liked ? "bg-red-500 text-white" : "bg-white border-black border-2"
        } py-2 px-4 `}
        onClick={handleLike}
      >
        {fetching ? <SpinnerIcon /> : <HeartIcon />}
        <span>{liked ? "Liked" : "Like"}</span>
      </button>
      {error && <p>{error}</p>}
    </div>
  );
}

export default App;
