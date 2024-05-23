import { MutableRefObject, RefObject } from "react";
import { TNote } from "./App";
import { NoteDimensions } from "./components/Notes";

export const createNewNoteWithPosition = (
  note: TNote,
  notes: TNote[],
  noteRefs: MutableRefObject<RefObject<HTMLDivElement>[]>
) => {
  let newNote = { ...note, position: determineNewPosition() };
  let newNoteRect: NoteDimensions = {
    top: newNote.position.y,
    bottom: newNote.position.y + 96,
    left: newNote.position.x,
    right: newNote.position.x + 256,
  };
  let isNewNoteOverlaping = checkOverlapping(
    notes,
    noteRefs,
    newNoteRect,
    newNote.id
  );

  while (isNewNoteOverlaping) {
    newNote = { ...newNote, position: determineNewPosition() };
    newNoteRect = {
      top: newNote.position.y,
      bottom: newNote.position.y + 96,
      left: newNote.position.x,
      right: newNote.position.x + 256,
    };
    isNewNoteOverlaping = checkOverlapping(
      notes,
      noteRefs,
      newNoteRect,
      newNote.id
    );
  }
  return newNote;
};

export const determineNewPosition = () => {
  const notesContainer = document.getElementById("notes-container");

  const maxX = window.innerWidth - 250;
  const maxY = window.innerHeight - 500;

  const startingYPoint = notesContainer?.getBoundingClientRect().top ?? 0;

  return {
    x: Math.ceil(Math.random() * maxX),
    y: startingYPoint + Math.ceil(Math.random() * maxY),
  };
};

export const checkOverlapping = (
  notes: TNote[],
  noteRefs: MutableRefObject<RefObject<HTMLDivElement>[]>,
  currentRectDimensions: NoteDimensions,
  id: number
) => {
  const currentRect = currentRectDimensions;

  return notes.some((x) => {
    if (x.id === id) {
      return false;
    }
    const otherRef = noteRefs.current[x.id].current as HTMLDivElement;
    const otherRect = otherRef.getBoundingClientRect();

    const overlap = !(
      currentRect.right < otherRect.left ||
      currentRect.left > otherRect.right ||
      currentRect.bottom < otherRect.top ||
      currentRect.top > otherRect.bottom
    );

    return overlap;
  });
};
