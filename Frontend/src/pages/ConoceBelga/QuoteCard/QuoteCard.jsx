import React from "react";
import './QuoteCard.css';
import Rating from '@mui/material/Rating';  // Importar Rating de MUI

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
        <Rating
          name="read-only"
          value={rating}
          readOnly  // Hace que la calificación sea de solo lectura
          precision={0.5}  // Permite medios puntos si es necesario
        />
      </div>
      <div className="quote-text">{quote}</div>
      <div className="quote-author">{author}</div>
      <img src={logo} id={id} className="quote-logo" loading="lazy" alt="Quote Logo" />
    </a>
  );
};

export default QuoteCard;

