import { FormEvent, useState } from "react";
import Comment from "./Comment";
import "./NestedComment.css";
import useComment from "./useComment";

export default function NestedComment() {
  const { comments, addNewComment, editComment, deleteComment } = useComment();
  const [text, setText] = useState("");

  const handleNewComment = (e: FormEvent) => {
    e.preventDefault();
    addNewComment(NaN, text);
    setText("");
  };

  const handleAddReply = (id: number, content: string) => {
    addNewComment(id, content);
  };

  const handleEdit = (id: number, content: string) => {
    editComment(id, content);
  };

  const handleDelete = (id: number) => {
    deleteComment(id);
  };

  return (
    <div className="nested-comment">
      <h2>NestedComment</h2>
      <div>
        <form className="textboard" onSubmit={handleNewComment}>
          <textarea
            placeholder="Write comments..."
            required
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button type="submit">Submit</button>
        </form>
        <div className="comment-section">
          {comments.map((comment) => (
            <Comment
              data={comment}
              key={comment.id}
              onSubmit={handleAddReply}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
