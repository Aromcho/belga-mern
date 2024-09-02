import React from "react";
import "./FeedbackMsg.css";

export const FeedbackMsg = ({ className = "error", msg }) => {
  return <div className={`feedback-container ${className}`}>{msg}</div>;
};

export default FeedbackMsg;
