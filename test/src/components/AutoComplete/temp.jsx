import React, { useCallback, useEffect, useState } from "react";
import "./AutoComplete";
import { Suggestions } from "./Suggestions";
import { debounce } from "lodash";

const myDebounce = (cb, delay) => {
  let timer; // Declare timer outside the returned function
  return function (...args) {
    // const context = this;
    if (timer) clearTimeout(timer); // Clear any existing timer

    timer = setTimeout(() => {
      // timer = null;
      // cb.apply(context, ...args);
      cb(...args);
    }, delay);
  };
};

export const AutoComplete = ({
  placeholder = "Search...",
  onSelect = () => {},
  dataKey = "key",
  fetchSuggestions = { fetchSuggestions },
  onChange = (input) => {},
  onBlur = (e) => {},
  onFocus = (e) => {},
  customLoading = <>Loading Recipes..</>,
}) => {
  const [text, setText] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(null);

  const handleOnChange = (e) => {
    setText(e.target.value);
    onChange(e.target.value);
  };

  const handleFetchSuggestion = async () => {
    setError(null);
    setSuggestions([]);
    // if (text.length > 0) {
    setLoader(true);
    try {
      const result = await fetchSuggestions(text);
      console.log(result);
      setSuggestions(result);
    } catch (error) {
      setError(true);
      setSuggestions([]);
    } finally {
      setLoader(false);
    }
    // } else {
    //   setSuggestions([]);
    // }
  };

  //   const handleFetchSuggestionDeBounce = myDebounce(handleFetchSuggestion, 100);

  const handleFetchSuggestionDeBounce = useCallback(
    // debounce(handleFetchSuggestion, 300),
    myDebounce(handleFetchSuggestion, 300),
    [text]
  );

  const handleSelect = (suggestion) => {
    setText(suggestion);
    onSelect(suggestion);
    setSuggestions([]);
  };

  useEffect(() => {
    if (text.length > 0) handleFetchSuggestionDeBounce();
    else setSuggestions([]);
  }, [text]);

  return (
    <div>
      <input
        type="text"
        onChange={handleOnChange}
        placeholder={placeholder}
        value={text}
        onFocus={onFocus}
        onBlur={onBlur}
      />
      <div>
        {(suggestions.length > 0 || loader || error) && (
          <ul>
            {loader && <div>{customLoading}</div>}
            {error && <div>{error}</div>}
            <Suggestions
              data={suggestions}
              onSelect={handleSelect}
              highlight={text}
            />
          </ul>
        )}
      </div>
    </div>
  );
};
