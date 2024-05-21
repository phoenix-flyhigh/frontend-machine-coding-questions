import { useState } from "react";
import "./App.css";
import Notes from "./components/Notes";

export type TNote = { id: number; text: string; position: CoOrds };
export type CoOrds = { x: number; y: number };

function App() {
  const [notes, setNotes] = useState<TNote[]>([
    {
      id: 1,
      text: "This is large",
      position: { x: 0, y: 0 },
    },
    {
      id: 2,
      text: "This is small",
      position: { x: 0, y: 0 },
    },
  ]);

  return (
    <div className="bg-black h-screen w-full flex justify-center items-center text-white">
      <Notes notes={notes} setNotes={setNotes} />
    </div>
  );
}

export default App;
