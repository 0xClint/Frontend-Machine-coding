import React, { useState } from "react";

export const Comment = ({
  comment,
  onSubmit = () => {},
  onDelete = () => {},
  onEdit = () => {},
}) => {
  const [isExpand, setExpand] = useState(false);
  const [content, setContent] = useState("");
  const [editMode, setEditMode] = useState(false);

  const handleSubmit = () => {
    if (content.length > 0) {
      onSubmit(comment.id, content);
      setContent(() => "");
      // setExpand(false);
    }
  };

  const handleDelete = (id) => {
    onDelete(id);
  };

  const handleEdit = (id, content) => {
    if (content.length > 0) {
      onEdit(id, content);
      setEditMode(false);
    }
    setContent();
  };
  return (
    <div className="comment-container">
      {editMode ? (
        <div className="text-area-container">
          <textarea
            rows={3}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <button
            onClick={() => {
              handleEdit(comment.id, content);
            }}
          >
            Save
          </button>
        </div>
      ) : (
        <div className="comment-content"> {comment.content}</div>
      )}
      <div className="comment-btn-container">
        <button className="btn">👍</button>
        <button className="btn">👎</button>
        <button className="btn" onClick={() => setExpand(!isExpand)}>
          {isExpand ? "Hide Replies" : "Reply"}
        </button>
        <button className="btn" onClick={() => handleDelete(comment.id)}>
          Delete
        </button>
        {!editMode && (
          <button
            className="btn"
            onClick={() => {
              setEditMode(!editMode);
              // console.log(comment.content);
              setContent(comment.content);
            }}
          >
            Edit
          </button>
        )}
      </div>
      {isExpand && (
        <div
          className="nested-comment"
          style={{
            paddingLeft: "14px",
          }}
        >
          <div className="text-area-container">
            <textarea
              rows={3}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <button onClick={handleSubmit}>Submit</button>
          </div>
          {comment.replies.map((item) => (
            <Comment
              comment={item}
              key={item.id}
              onDelete={onDelete}
              onSubmit={onSubmit}
              onEdit={onEdit}
            />
          ))}
        </div>
      )}
    </div>
  );
};
