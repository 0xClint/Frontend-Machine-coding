import React, { useState } from "react";
import { useComment } from "./useComment";
import { commentData } from "./data";
import "./NestedComment.css";
import { Comment } from "./Comment";

export const NestedComment = () => {
  const {
    comments: commentsData,
    addNewComment,
    deleteComment,
    editComment,
  } = useComment(commentData);
  const [content, setContent] = useState("");

  const handleAddReply = (id, content) => {
    addNewComment(id, content);
  };

  const handleAddNewComment = () => {
    handleAddReply("", content);
  };

  const handleDeleteComment = (id) => {
    deleteComment(id);
  };

  const handleEditComment = (id, content) => {
    editComment(id, content);
  };

  return (
    <div className="nested-comment-container">
      <div className="text-area-container">
        <textarea
          rows={3}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button onClick={handleAddNewComment}>Submit</button>
      </div>
      <div className="nested-comment">
        {commentsData.map((comment) => (
          <Comment
            comment={comment}
            key={comment.id}
            onSubmit={handleAddReply}
            onDelete={handleDeleteComment}
            onEdit={handleEditComment}
          />
        ))}
      </div>
    </div>
  );
};
