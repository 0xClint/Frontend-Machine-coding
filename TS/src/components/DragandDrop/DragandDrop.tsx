import React, { useRef, useState } from "react";
import "./DragandDrop.css";

const tempData = {
  Todo: [
    { id: 123, content: "Task 123" },
    { id: 156, content: "Task 156" },
  ],
  inProgress: [
    { id: 167, content: "Task 167" },
    { id: 189, content: "Task 189" },
  ],
  completed: [
    { id: 213, content: "Task 213" },
    { id: 345, content: "Task 345" },
  ],
};

export default function DragandDrop() {
  const [taskText, setTaskText] = useState<string>("");
  const [taskStatus, setTaskStatus] = useState<string>("");

  const [data, setData] = useState(tempData);

  const dragItemRef = useRef<any | null>(null);
  const dragContainerRef = useRef<any | null>(null);

  const handleDragStart = (e: any, content: any, container: string) => {
    dragItemRef.current = content;
    dragContainerRef.current = container;
    e.target.style.opacity = "0.5";
  };

  const handleDragEnd = (e: any) => {
    e.target.style.opacity = "1";
  };

  const handleDrop = (e: any, status: string) => {
    const targetItem = dragItemRef.current;
    const sourceStatus = dragContainerRef.current;

    setData((prevState) => {
      const newData = { ...prevState };
      newData[sourceStatus] = newData[sourceStatus].filter(
        ({ id }) => id !== targetItem?.id
      );

      newData[status] = [...newData[status], targetItem];
      return newData;
    });
  };

  const handleDragOver = (e: any) => {
    e.preventDefault();
  };

  const handleSubmitTask = (e: any) => {
    e.preventDefault();

    setData((prevState) => {
      const newData = { ...prevState };

      newData[taskStatus] = [
        ...newData[taskStatus],
        { id: Math.floor(Math.random() * 1000), content: taskText },
      ];
      return newData;
    });
  };

  return (
    <div>
      <h2>Drag and Drop</h2>
      <form onSubmit={handleSubmitTask}>
        <div>
          <label>Add task</label>
          <input
            type="text"
            required
            value={taskText}
            onChange={(e) => setTaskText(e.target.value)}
          />
        </div>
        <select
          onChange={(e) => setTaskStatus(e.target.value)}
          required
          defaultValue={""}
        >
          <option value={""} disabled>
            Select
          </option>
          {Object.keys(data).map((status) => (
            <option value={status} key={status}>
              {status}
            </option>
          ))}
        </select>
        <button type="submit">Submit</button>
      </form>
      <div className="dragandDrop-container">
        {Object.keys(data).map((status) => (
          <div
            key={status}
            className="dragandDrop-status-container"
            onDrop={(e) => handleDrop(e, status)}
            onDragOver={handleDragOver}
          >
            <h3>{status}</h3>
            <div className="dragandDrop-content">
              {data[status].map(({ id, content }) => (
                <div
                  key={id}
                  className="dragandDrop-content-item"
                  draggable
                  onDragStart={(e) =>
                    handleDragStart(e, { id, content }, status)
                  }
                  onDragEnd={handleDragEnd}
                >
                  {content}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
