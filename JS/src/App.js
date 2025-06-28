import { useEffect, useState } from "react";
import "./App.css";

const dummmyList = [
  {
    id: 1,
    label: "test1",
  },
  {
    id: 2,
    label: "test2",
  },
];
function App() {
  const [list, setList] = useState(dummmyList);
  const [text, setText] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("https://jsonplaceholder.typicode.com/todos");
        // console.log(res);
        if (!res.ok) throw new Error("Error");
        const data = await res.json();
        setList(data.slice(0, 5));
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const addItem = (title) => {
    setList((prevState) => [...prevState, { id: Date.now(), title }]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addItem(text);
    setText("");
  };
  
  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <label>Add Item</label>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        />
        <button type="submit">Submit</button>
      </form>
      <ul>
        {list &&
          list.length > 0 &&
          list.map(({ id, title }) => <li key={id}>{title}</li>)}
      </ul>
    </div>
  );
}

export default App;
