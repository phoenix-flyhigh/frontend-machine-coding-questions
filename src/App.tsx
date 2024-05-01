import { useState } from "react";
import CommentBox, { IComment } from "./components/CommentBox";
import { useUpdateComment } from "./hooks/useUpdateComment";

const initialComment: IComment = {
  id: 1,
  name: "",
  items: [
    {
      id: 3,
      name: "def",
      items: [
        { id: 4, name: "fgh", items: [] },
        { id: 5, name: "stv", items: [{ id: 6, name: "lof", items: [] }] },
      ],
    },
    { id: 2, name: "abc", items: [] },
  ],
};

function App() {
  const [comments, setComments] = useState<IComment>(initialComment);

  const { editComment, insertComment, deleteComment } = useUpdateComment();

  const handleEdit = (commentId: number, updatedValue: string) => {
    if (updatedValue.trim().length < 1) return;

    const data = editComment(commentId, updatedValue, comments);
    setComments(data);
  };

  const handleInsert = (parentId: number, comment: string) => {
    if (comment.trim().length < 1) return;

    const data = insertComment(parentId, comment, comments);
    setComments(data);
  };

  const handleDelete = (commentId: number) => {
    const data = deleteComment(commentId, comments);
    setComments({ ...data });
  };

  return (
    <div className="h-screen w-full flex m-3">
      <CommentBox
        comment={comments}
        handleEdit={handleEdit}
        handleInsert={handleInsert}
        handleDelete={handleDelete}
      />
    </div>
  );
}

export default App;
