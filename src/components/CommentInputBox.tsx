interface CommentInputBoxProps {
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
  handleInsert: (parentId: number, comment: string) => void;
}

const CommentInputBox = ({
  text,
  setText,
  handleInsert,
}: CommentInputBoxProps) => {
  return (
    <form
      className="flex gap-4 items-center"
      onSubmit={(e) => {
        e.preventDefault();
        handleInsert(1, text);
        setText("");
      }}
    >
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="border-2 border-black py-1 px-4 w-96"
      />
      <button
        className="bg-blue-200 hover:bg-blue-400 rounded-xl px-4 py-1"
        type="submit"
      >
        Comment
      </button>
    </form>
  );
};

export default CommentInputBox;
