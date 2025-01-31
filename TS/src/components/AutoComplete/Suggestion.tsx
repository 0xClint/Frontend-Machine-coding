import { IReceipe } from "./AutoComplete";
import "./Suggestion.css";

interface ISuggestionInterface {
  data: IReceipe;
  query: string;
}
export default function Suggestion({ data, query }: ISuggestionInterface) {
  const { name } = data;

  const parts = name.split(new RegExp(`(${query})`, "gi"));
  return (
    <div className="suggestion-item">
      {parts.map((item, idx) => {
        const highlight =
          item.toLocaleLowerCase() === query.toLocaleLowerCase();
        return (
          <span
            key={idx}
            className={`suggestion-item-part ${highlight && "active"}`}
          >
            {item}
          </span>
        );
      })}
    </div>
  );
}
