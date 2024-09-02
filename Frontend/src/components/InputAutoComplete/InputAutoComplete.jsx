import React, { useState, useEffect } from "react";
import "./InputAutoComplete.css";

export const InputAutoComplete = ({
  label,
  placeHolder,
  type = 'text',
  bottomText,
  className,
  errorText,
  maxLength,
  required,
  readonly = false,
  suggestions,
  onChangeValue
}) => {

  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(0);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [input, setInput] = useState("");

  const onChange = (e) => {
    const userInput = e.target.value;
    const unLinked = suggestions.filter(
      (suggestion) =>
        suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    );

    setInput(e.target.value);
    setFilteredSuggestions(unLinked);
    setActiveSuggestionIndex(0);
    setShowSuggestions(true);
  };

  const onClick = (e) => {
    setFilteredSuggestions([]);
    setInput(e.target.innerText);
    setActiveSuggestionIndex(0);
    setShowSuggestions(false);
  };

  const onKeyDown = (key) => {
    if (key.keyCode === 13 || key.keyCode === 9) {
      setInput(filteredSuggestions[activeSuggestionIndex])
      setFilteredSuggestions([])
    }
  }

  useEffect(() => {
    if (onChangeValue) onChangeValue(input)
  }, [input, onChangeValue])

  const SuggestionsListComponent = () => {
    return filteredSuggestions.length ? (
      <div className="list-styled">
        <div className="list-wrapper">
          {filteredSuggestions.map((suggestion, index) => {
            let className;
            if (index === activeSuggestionIndex) {
              className = "suggestion-active";
            }
            return (
              <div className={`item ${className}`} key={suggestion} onClick={onClick}>
                {suggestion}
              </div>
            );
          })}
        </div>
      </div>
    ) : (
      <div className="list-styled no-suggestions">
        <div className="item">Sin coincidencias.</div>
      </div>
    );
  };

  return (
    <div className={`input-wrapper ${className}`}>
      {label && <label className="input-label">{label}</label>}
      <input
        className="input-styled"
        type={type}
        value={input}
        placeholder={placeHolder}
        onChange={onChange}
        onKeyDown={onKeyDown}
        autoComplete='off'
        maxLength={maxLength}
        required={required || false}
        readOnly={readonly}
      />
      {className === 'error' && <div className="error-text">{errorText}</div>}
      {bottomText && <div className="bottom-text">{bottomText}</div>}

      {showSuggestions && input && <SuggestionsListComponent />}
    </div>
  );
};

export default InputAutoComplete;
