import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import Action from "./Action";

interface EditCommentBoxProps {
  onSave: () => void;
  onCancel: () => void;
  text: string;
  setText: Dispatch<SetStateAction<string>>;
}

const EditCommentBox = ({
  onCancel,
  onSave,
  text,
  setText,
}: EditCommentBoxProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current && inputRef.current.focus();
  }, []);
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSave();
      }}
    >
      <input
        ref={inputRef}
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="border-2 border-black px-4 w-80"
      />
      <div className="flex gap-3 items-center">
        <Action type="Save" buttonType="submit" />
        <Action type="Cancel" handleClick={onCancel} />
      </div>
    </form>
  );
};

export default EditCommentBox;
