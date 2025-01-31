import { useEffect, useState } from "react";
import Suggestion from "./Suggestion";
import "./AutoComplete.css";

export interface IReceipe {
  id: number;
  name: string;
}
interface IQueryResponse {
  limit: number;
  recipes: IReceipe[];
  skip: number;
  total: number;
}

export default function AutoComplete() {
  const [query, setQeury] = useState<string>("");
  const [suggestions, setSuggestions] = useState<IReceipe[]>([]);

  const fetchSuggestion = async (text: string) => {
    if (text.length === 0) {
      setSuggestions([]);
      return;
    }
    try {
      const res = await fetch(`https://dummyjson.com/recipes/search?q=${text}`);

      if (!res.ok) new Error("something went wrong!");
      const data: IQueryResponse = await res.json();

      setSuggestions(data.recipes);
    } catch (error) {
      console.log(error);
    }
  };

  //****************Debounce function******************
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchSuggestion(query);
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div className="auto-complete">
      <input
        value={query}
        onChange={(e) => setQeury(e.target.value)}
        placeholder="Search..."
      />
      <ul className="suggestion-container">
        {suggestions.map((suggestion) => (
          <Suggestion key={suggestion.id} data={suggestion} query={query} />
        ))}
      </ul>
    </div>
  );
}
