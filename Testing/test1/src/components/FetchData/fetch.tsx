import { useState, useEffect } from "react";

interface User {
  id: number;
  name: string;
}

const FetchData = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users?_limit=5"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result: User[] = await response.json();
        setUsers(result);
      } catch (error) {
        setError((error as Error).message);
      }
    };

    fetchData();
  }, []);

  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Fetched Data</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default FetchData;
