import React from "react";
import "./App.css";
import { Dictionary } from "./components/Dictionary";

function App() {
  return (
    <div className="bg-black text-white min-h-screen w-full flex justify-center items-center overflow-auto p-6">
      <Dictionary />
    </div>
  );
}

export default App;
