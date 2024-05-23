import {
  Dispatch,
  RefObject,
  SetStateAction,
  createRef,
  useEffect,
  useRef,
} from "react";
import { TNote } from "../App";
import Note from "./Note";
import { checkOverlapping, createNewNoteWithPosition } from "../notesHelper";

interface NotesProps {
  notes: TNote[];
  setNotes: Dispatch<SetStateAction<TNote[]>>;
}

export interface NoteDimensions {
  top: number;
  bottom: number;
  left: number;
  right: number;
}

const Notes = ({ notes, setNotes }: NotesProps) => {
  const noteRefs = useRef<RefObject<HTMLDivElement>[]>([]);

  useEffect(() => {
    const localData = localStorage.getItem("notes");

    const savedNotes: TNote[] = JSON.parse(localData ?? "[]");
    const updatedNotes = notes.map((note) => {
      const savedNote = savedNotes.find((x) => x.id === note.id);
      if (savedNote) {
        return savedNote;
      } else {
        return createNewNoteWithPosition(note, notes, noteRefs);
      }
    });
    const updatedData = [
      ...updatedNotes,
      ...savedNotes.filter((saved) => !notes.some((x) => x.id === saved.id)),
    ];
    localStorage.setItem("notes", JSON.stringify(updatedData));
    setNotes(updatedData);
  }, [notes.length]);

  const handleDragStart = (
    note: TNote,
    e: React.MouseEvent<HTMLDivElement>
  ) => {
    const noteRef: HTMLDivElement = noteRefs.current[note.id]
      .current as HTMLDivElement;
    const box = noteRef.getBoundingClientRect();
    const offSetX = e.clientX - box.left;
    const offSetY = e.clientY - box.top;

    const startPos = note.position;

    const handleMouseMove = (e: MouseEvent) => {
      const newX = e.clientX - offSetX;
      const newY = e.clientY - offSetY;

      noteRef.style.top = `${newY}px`;
      noteRef.style.left = `${newX}px`;
    };

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);

      const finalPosition = noteRef.getBoundingClientRect();
      const currentNote = noteRefs.current[note.id].current as HTMLDivElement;
      const currentRect = currentNote.getBoundingClientRect();

      if (checkOverlapping(notes, noteRefs, currentRect, note.id)) {
        noteRef.style.top = `${startPos.y}px`;
        noteRef.style.left = `${startPos.x}px`;
      } else {
        const updatedNotes = notes.map((x) =>
          x.id === note.id
            ? {
                ...x,
                position: { x: finalPosition.left, y: finalPosition.top },
              }
            : x
        );
        setNotes(updatedNotes);
        localStorage.setItem("notes", JSON.stringify(updatedNotes));
      }
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  return (
    <div className="h-full w-full p-8" id="notes-container">
      {notes.map((x) => (
        <Note
          key={x.id}
          ref={
            noteRefs.current[x.id]
              ? noteRefs.current[x.id]
              : (noteRefs.current[x.id] = createRef<HTMLDivElement>())
          }
          content={x.text}
          initialPosition={x.position}
          onMouseDown={(e) => handleDragStart(x, e)}
        />
      ))}
    </div>
  );
};

export default Notes;
