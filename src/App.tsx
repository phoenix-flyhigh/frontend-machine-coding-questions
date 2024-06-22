import React from "react";
import "./App.css";
import DATA from "./data";
import { Game } from "./Game";

function App() {
  return (
    <div className=" h-screen w-full flex justify-center items-center">
      <Game data={DATA}/>
    </div>
  );
}

export default App;
