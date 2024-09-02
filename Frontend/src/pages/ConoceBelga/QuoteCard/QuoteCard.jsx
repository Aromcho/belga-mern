import React from "react";
import './QuoteCard.css';
import { RatingStart } from "components/ratingStart";

export const QuoteCard = ({
  className,
  link,
  rating,
  quote,
  author,
  logo,
  id
}) => {
  return (
    <a href={link ?? " "} target="_blank" className={`quote-container ${className}`}>
      <div className="quote-rating">
        <RatingStart itemSelected={rating} qtyItems={5} noSelect />
      </div>
      <div className="quote-text">{quote}</div>
      <div className="quote-author">{author}</div>
      <img src={logo} id={id} className="quote-logo" loading="lazy" alt="Quote Logo" />
    </a>
  );
};

export default QuoteCard;
