import React from "react";
import "./App.css";
import Wordle from "./Wordle";

function App() {
  return (
    <div className="bg-black text-white border-white h-screen w-full flex justify-center items-start p-12">
      <Wordle />
    </div>
  );
}

export default App;
