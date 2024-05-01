import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import Action from "./Action";

interface ReplyToCommentBoxProps {
  onReply: () => void;
  onCancel: () => void;
  text: string;
  setText: Dispatch<SetStateAction<string>>;
}

const ReplyToCommentBox = ({
  onCancel,
  onReply,
  text,
  setText,
}: ReplyToCommentBoxProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current && inputRef.current.focus();
  }, []);
  return (
    <form
      className="flex gap-3 items-center ml-8"
      onSubmit={(e) => {
        e.preventDefault();
        onReply();
      }}
    >
      <input
        ref={inputRef}
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="border-2 border-black py-1 px-4 w-80"
      />
      <Action type="Reply" buttonType="submit" />
      <Action type="Cancel" handleClick={onCancel} />
    </form>
  );
};

export default ReplyToCommentBox;
