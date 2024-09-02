import React from "react";
import "./Input.css";

export const Input = ({
  label,
  placeHolder,
  value,
  type,
  bottomText,
  error,
  className,
  name,
  errorText,
  onChange,
  onBlur,
  onFocus,
  onKeyPress,
  maxLength,
  required,
  readonly = false,
  min,
  max,
}) => {
  return (
    <div className={`input-wrapper ${className} ${error ? "error" : ""}`}>
      {label && <label className="input-label">{label}</label>}
      <input
        className="input-styled"
        type={type}
        value={value}
        name={name}
        placeholder={placeHolder}
        onChange={onChange}
        onBlur={onBlur}
        onFocus={onFocus}
        onKeyPress={onKeyPress}
        autoComplete="off"
        maxLength={maxLength}
        required={required || false}
        readOnly={readonly}
        min={min}
        max={max}
      />
      {error && <div className="error-text">{errorText}</div>}
      {bottomText && <div className="bottom-text">{bottomText}</div>}
    </div>
  );
};

export default Input;
