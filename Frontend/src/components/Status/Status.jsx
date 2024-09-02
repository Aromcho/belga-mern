import React from "react";
import { Button } from "components/button";
import "./Status.css";

export const Status = ({
  className,
  img,
  text,
  textButton,
  buttonStyle,
  linkButton,
}) => {
  return (
    <div className={`status-wrapper ${className}`}>
      {img && (
        <div className="img-wrapper">
          <img src={img} className="status-img" alt="Status" />
        </div>
      )}
      <div className="status-text">{text}</div>
      {linkButton && (
        <Button
          className="button--status"
          text={textButton}
          type={buttonStyle}
          link={linkButton}
        />
      )}
    </div>
  );
};
