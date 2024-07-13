import React from "react";
import "./App.css";
import FileExplorer from "./components/FileExplorer";

function App() {
  return (
    <div className="bg-black text-slate-300 h-screen w-full flex justify-center items-center">
      <FileExplorer />
    </div>
  );
}

export default App;
