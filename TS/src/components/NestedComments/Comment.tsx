import { FormEvent, useState } from "react";
import "./Comment.css";
import { Icomments } from "./Data";

interface IcommentProps {
  data: Icomments;
  onSubmit: (id: number, content: string) => void;
  onEdit: (id: number, content: string) => void;
  onDelete: (id: number) => void;
}

export default function Comment({
  data,
  onSubmit = () => {},
  onEdit = () => {},
  onDelete = () => {},
}: IcommentProps) {
  const { id, content, replies } = data;
  const [text, setText] = useState("");
  const [extended, setExtended] = useState<boolean>(false);
  const [editMode, setEditMode] = useState<boolean>(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(id, text);
    setText("");
  };

  const handleEditMode = () => {
    setEditMode(true);
    setText(content);
    const textBox = document.getElementById(`editbox-${id}`);
    if (textBox) textBox.focus();
  };

  const handleEdit = (e: FormEvent) => {
    e.preventDefault();
    onEdit(id, text);
    setText("");
    setEditMode(false);
  };

  const handleDelete = () => {
    onDelete(id);
  };

  return (
    <div className="comment">
      {editMode ? (
        <form
          onSubmit={handleEdit}
          className="textboard"
          style={{ padding: "10px 10px 10px 0" }}
        >
          <textarea
            placeholder="Write Reply..."
            required
            value={text}
            id={`editbox-${id}`}
            onChange={(e) => setText(e.target.value)}
          />
          <button type="submit">Submit</button>
        </form>
      ) : (
        <div className="content">{content}</div>
      )}
      <div className="comment-actions">
        <button>👍</button>
        <button>👎</button>
        <button onClick={() => setExtended(!extended)}>
          {extended ? "Hide" : "Reply"}
        </button>
        <button onClick={handleDelete}>Delete</button>
        {!editMode && <button onClick={handleEditMode}>Edit</button>}
      </div>
      {extended && (
        <>
          <form
            onSubmit={handleSubmit}
            className="textboard"
            style={{ padding: "10px 10px 10px 0" }}
          >
            <textarea
              placeholder="Write Reply..."
              required
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <button type="submit">Add reply</button>
          </form>
          <div
            className="replies"
            style={{ paddingLeft: "10px", borderLeft: "1px solid black" }}
          >
            {replies.map((reply) => (
              <Comment
                data={reply}
                key={reply.id}
                onSubmit={onSubmit}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
