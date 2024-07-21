import { MemoryBoard } from "./MemoryBoard";
import "./App.css";

function App() {
  return (
    <div className="bg-black text-white h-screen w-full flex justify-center items-center">
      <MemoryBoard boardSize={4}/>
    </div>
  );
}

export default App;
