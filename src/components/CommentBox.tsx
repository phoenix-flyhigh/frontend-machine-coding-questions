import { FiChevronDown } from "react-icons/fi";
import { FiChevronUp } from "react-icons/fi";
import Action from "./Action";
import { useState } from "react";
import CommentInputBox from "./CommentInputBox";
import EditCommentBox from "./EditCommentBox";
import ReplyToCommentBox from "./ReplyToCommentBox";

export interface IComment {
  id: number;
  name: string;
  items: IComment[];
}

interface CommentProps {
  comment: IComment;
  handleEdit: (commentId: number, updatedValue: string) => void;
  handleInsert: (parentId: number, comment: string) => void;
  handleDelete: (commentId: number) => void;
}

const CommentBox = ({
  comment,
  handleEdit,
  handleInsert,
  handleDelete,
}: CommentProps) => {
  const [text, setText] = useState("");
  const [expanded, setExpanded] = useState(true);
  const [showInput, setShowInput] = useState(false);
  const [editMode, setEditMode] = useState(false);

  return (
    <div className="flex flex-col gap-3 w-full">
      {comment.id === 1 ? (
        <>
          <CommentInputBox
            text={text}
            setText={setText}
            handleInsert={handleInsert}
          />
          {comment.items.map((s) => (
            <CommentBox
              key={s.id}
              comment={s}
              handleEdit={handleEdit}
              handleInsert={handleInsert}
              handleDelete={handleDelete}
            />
          ))}
        </>
      ) : (
        <div className="ml-8 flex flex-col gap-3">
          <div className="bg-gray-200 p-3 rounded-lg w-1/4 ml-8 flex flex-col gap-3">
            {editMode ? (
              <EditCommentBox
                onSave={() => {
                  handleEdit(comment.id, text);
                  setEditMode(false);
                  setText("");
                }}
                onCancel={() => setEditMode(false)}
                text={text}
                setText={setText}
              />
            ) : (
              <>
                <p>{comment.name}</p>
                <div className="flex gap-3 items-center">
                  {expanded ? (
                    <Action
                      type={<FiChevronUp />}
                      handleClick={() => setExpanded(false)}
                    />
                  ) : (
                    <Action
                      type={<FiChevronDown />}
                      handleClick={() => setExpanded(true)}
                    />
                  )}
                  <Action type="Reply" handleClick={() => setShowInput(true)} />
                  <Action type="Edit" handleClick={() => setEditMode(true)} />
                  <Action
                    type="Delete"
                    handleClick={() => {
                      handleDelete(comment.id);
                    }}
                  />
                </div>
              </>
            )}
          </div>
          {expanded && (
            <>
              {showInput && (
                <ReplyToCommentBox
                  onReply={() => {
                    handleInsert(comment.id, text);
                    setShowInput(false);
                    setText("");
                  }}
                  onCancel={() => setShowInput(false)}
                  text={text}
                  setText={setText}
                />
              )}
              {comment.items.map((s) => (
                <CommentBox
                  key={s.id}
                  comment={s}
                  handleEdit={handleEdit}
                  handleInsert={handleInsert}
                  handleDelete={handleDelete}
                />
              ))}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default CommentBox;
