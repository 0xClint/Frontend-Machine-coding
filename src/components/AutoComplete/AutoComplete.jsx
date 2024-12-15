import React, { useCallback, useEffect, useState } from "react";
import "./AutoComplete";
import { Suggestions } from "./Suggestions";

const myDebounce = (cb, delay) => {
  let timer;

  const debouncedFn = (...args) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => cb(...args), delay);
  };

  debouncedFn.cancel = () => {
    if (timer) clearTimeout(timer);
  };

  return debouncedFn;
};

export const AutoComplete = ({
  placeholder = "Search...",
  onSelect = () => {},
  dataKey = "key",
  fetchSuggestions = () => {},
  onChange = (input) => {},
  onBlur = (e) => {},
  onFocus = (e) => {},
  customLoading = <>Loading Recipes...</>,
}) => {
  const [text, setText] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(null);

  const handleOnChange = (e) => {
    setText(e.target.value);
    onChange(e.target.value);
  };

  const handleFetchSuggestion = useCallback(async () => {
    setError(null);
    setSuggestions([]);
    setLoader(true);
    try {
      const result = await fetchSuggestions(text);
      setSuggestions(result);
    } catch (err) {
      setError(true);
      setSuggestions([]);
    } finally {
      setLoader(false);
    }
  }, [fetchSuggestions, text]);

  const handleFetchSuggestionDeBounce = useCallback(
    myDebounce(handleFetchSuggestion, 300),
    [handleFetchSuggestion]
  );

  useEffect(() => {
    if (text.length > 0) handleFetchSuggestionDeBounce();
    else setSuggestions([]);

    // Cleanup debounce on component unmount or dependency change
    return () => handleFetchSuggestionDeBounce.cancel();
  }, [text]);

  const handleSelect = (suggestion) => {
    setText(suggestion);
    onSelect(suggestion);
    setSuggestions([]);
  };

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
            {error && <div>Error fetching suggestions</div>}
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
