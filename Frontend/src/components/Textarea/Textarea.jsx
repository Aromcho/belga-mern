import React from "react";
import { classes } from "../../helpers/index.js";
import "./Textarea.css";

export const Textarea = ({
  label,
  placeHolder,
  value,
  name, // Asegúrate de agregar la prop `name`
  bottomText,
  className,
  error,
  errorText,
  onChange,
  required,
}) => {
  return (
    <div className={classes("input-wrapper", className, { error })}>
      {label && <label className="label">{label}</label>}
      <textarea
        className="textarea-styled"
        value={value}
        name={name}
        placeholder={placeHolder}
        onChange={onChange}
        autoComplete="off"
        required={required || false}
      />
      {error && <div className="error-text">{errorText}</div>}
      {bottomText && <div className="bottom-text">{bottomText}</div>}
    </div>
  );
};
