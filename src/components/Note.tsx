import { DOMAttributes, ForwardedRef, forwardRef } from "react";
import { CoOrds } from "../App";

interface NoteProps extends DOMAttributes<HTMLDivElement> {
  content: string;
  initialPosition: CoOrds;
}

const Note = forwardRef<HTMLDivElement, NoteProps>(
  (
    { content, initialPosition, ...props }: NoteProps,
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    return (
      <div
        ref={ref}
        style={{
          top: `${initialPosition.y}px`,
          left: `${initialPosition.x}px`,
        }}
        className={`border-2 border-white rounded-lg w-64 bg-slate-700 h-24 p-3 absolute select-none cursor-move`}
        {...props}
      >
        {content}
      </div>
    );
  }
);

export default Note;
