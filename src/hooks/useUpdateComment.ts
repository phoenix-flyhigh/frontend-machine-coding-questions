import { IComment } from "../components/CommentBox";

export const useUpdateComment = () => {
  const editComment = (
    updatedCommentId: number,
    updatedComment: string,
    comment: IComment
  ) => {
    if (comment.id === updatedCommentId) {
      comment.name = updatedComment;
      return comment;
    }

    comment.items.map((x) => editComment(updatedCommentId, updatedComment, x));

    return { ...comment };
  };

  const insertComment = (id: number, value: string, comment: IComment) => {
    if (comment.id === id) {
      comment.items.push({
        id: new Date().getTime(),
        name: value,
        items: [],
      });
      return comment;
    }
    const updatedComments: IComment[] = comment.items.map((x) =>
      insertComment(id, value, x)
    );
    return { ...comment, items: updatedComments };
  };

  const deleteComment = (commentId: number, comments: IComment) => {
    for (let i = 0; i < comments.items.length; i += 1) {
      const currentComment = comments.items[i];
      if (currentComment.id === commentId) {
        comments.items.splice(i, 1);
        return comments;
      } else {
        deleteComment(commentId, currentComment);
      }
    }

    return comments;
  };

  return {
    editComment,
    insertComment,
    deleteComment,
  };
};
