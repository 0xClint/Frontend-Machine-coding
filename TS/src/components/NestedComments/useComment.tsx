import { useState } from "react";
import { commentsData, Icomments } from "./Data";

export default function useComment() {
  const [comments, setComments] = useState<Icomments[]>(commentsData);

  const insertNode = (
    tree: Icomments[],
    id: number,
    newComment: Icomments
  ): Icomments[] => {
    return tree.map((comment) => {
      if (id === comment.id) {
        return { ...comment, replies: [...comment.replies, newComment] };
      } else if (comment.replies && comment.replies.length > 0) {
        return {
          ...comment,
          replies: insertNode(comment.replies, id, newComment),
        };
      } else return comment;
    });
  };

  const addNewComment = (id: number, content: string) => {
    const newComment: Icomments = {
      id: Math.floor(Math.random() * 1000000),
      content,
      timestamp: new Date().toISOString(),
      votes: 0,
      replies: [],
    };

    if (id) {
      setComments((prevState) => insertNode(prevState, id, newComment));
    } else {
      setComments((prevState) => [...prevState, newComment]);
    }
  };

  const editNode = (
    tree: Icomments[],
    id: number,
    newContent: string
  ): Icomments[] => {
    return tree.map((comment) => {
      if (id === comment.id) {
        return { ...comment, content: newContent };
      } else if (comment.replies && comment.replies.length > 0) {
        return {
          ...comment,
          replies: editNode(comment.replies, id, newContent),
        };
      } else return comment;
    });
  };

  const editComment = (id: number, content: string) => {
    setComments((prevState) => editNode(prevState, id, content));
  };

  const deleteNode = (tree: Icomments[], id: number) => {
    return tree
      .filter((comment) => comment.id !== id)
      .map(
        (comment): Icomments => ({
          ...comment,
          replies: deleteNode(comment.replies, id),
        })
      );
  };

  const deleteComment = (id: number) => {
    setComments((prevState) => deleteNode(prevState, id));
  };

  return { comments, insertNode, addNewComment, editComment, deleteComment };
}
