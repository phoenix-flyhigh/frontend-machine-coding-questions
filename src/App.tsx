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
  const [note, setNote] = useState("");

  return (
    <div className="bg-black h-screen w-full flex flex-col p-4 items-center  text-white">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (note.length > 0) {
            const newNote = {
              id: notes.length + 1,
              text: note,
              position: { x: 0, y: 0 },
            };

            setNotes((prev) => [...prev, newNote]);
            setNote("");
          }
        }}
        className="flex gap-4 items-center"
      >
        <input
          type="text"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Add a New Note"
          className="px-2 w-64 py-1 border-black border-2 text-black"
        />
        <input type="submit" value={"Add Note"} />
      </form>
      <Notes notes={notes} setNotes={setNotes} />
    </div>
  );
}

export default App;
