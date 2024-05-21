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

interface NotesProps {
  notes: TNote[];
  setNotes: Dispatch<SetStateAction<TNote[]>>;
}

const Notes = ({ notes, setNotes }: NotesProps) => {
  const noteRefs = useRef<RefObject<HTMLDivElement>[]>([]);

  useEffect(() => {
    const data = localStorage.getItem("notes");

    const savedNotes: TNote[] =
      data !== "undefined" ? JSON.parse(data ?? "[]") : [];
    const updatedNotes = notes.map((note) => {
      const savedNote = savedNotes.find((x) => x.id === note.id);
      if (savedNote) {
        return savedNote;
      } else {
        return { ...note, position: determineNewPosition() };
      }
    });
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
    setNotes(updatedNotes);
  }, [notes.length]);

  const determineNewPosition = () => {
    const maxX = window.innerWidth - 250;
    const maxY = window.innerHeight - 250;

    return {
      x: Math.ceil(Math.random() * maxX),
      y: Math.ceil(Math.random() * maxY),
    };
  };

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

      if (checkOverlapping(note.id)) {
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

  const checkOverlapping = (id: number) => {
    const currentNote = noteRefs.current[id].current as HTMLDivElement;
    const currentRect = currentNote.getBoundingClientRect();

    return notes.some((x) => {
      if (x.id === id) {
        return false;
      }
      const otherRef = noteRefs.current[x.id].current as HTMLDivElement;
      const otherRect = otherRef.getBoundingClientRect();

      const overlap = !(
        currentRect.top > otherRect.bottom ||
        currentRect.bottom < otherRect.top ||
        currentRect.right < otherRect.left ||
        currentRect.left > otherRect.right
      );
      return overlap;
    });
  };

  return (
    <div>
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
