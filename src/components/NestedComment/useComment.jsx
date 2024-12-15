import React, { useState } from "react";

export const useComment = (initialComment) => {
  const [comments, setComments] = useState(initialComment);
  // console.log(comments);

  const insertNode = (tree, commentId, newComment) => {
    return tree.map((comment) => {
      if (comment.id == commentId) {
        return {
          ...comment,
          replies: [...comment.replies, newComment],
        };
      } else if (comment.replies && comment.replies.length > 0) {
        return {
          ...comment,
          replies: insertNode(comment.replies, commentId, newComment),
        };
      } else return comment;
    });
  };

  const addNewComment = (commentId, content) => {
    const newComment = {
      id: new Date().getTime(),
      content,
      votes: 0,
      timestamp: new Date().toISOString(),
      replies: [],
    };

    if (commentId) {
      setComments((prevComments) =>
        insertNode(prevComments, commentId, newComment)
      );
    } else {
      setComments((preComments) => [newComment, ...preComments]);
    }
  };

  const deleteNode = (tree, id) => {
    return tree.filter((comment) => {
      if (comment.id === id) return false;
      else if (comment.replies && comment.replies.length > 0) {
        return deleteNode(comment.replies, id);
      } else return comment;
    });
  };

  const deleteComment = (commentId) => {
    return setComments((prevComment) => deleteNode(prevComment, commentId));
  };

  const editNode = (tree, commentId, content) => {
    return tree.map((comment) => {
      if (comment.id == commentId) {
        return {
          ...comment,
          content: content,
        };
      } else if (comment.replies && comment.replies.length > 0) {
        return {
          ...comment,
          replies: editNode(comment.replies, commentId, content),
        };
      } else return comment;
    });
  };

  const editComment = (commentId, content) => {
    console.log(commentId, content);
    return setComments((prevComment) =>
      editNode(prevComment, commentId, content)
    );
  };

  return {
    comments,
    addNewComment,
    deleteComment,
    editComment,
  };
};
