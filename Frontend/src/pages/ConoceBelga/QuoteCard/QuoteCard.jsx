import React from "react";
import './QuoteCard.css'; // Asegúrate de tener este archivo CSS o convertirlo en styled components
import Rating from '@mui/material/Rating'; // Importar Rating de MUI

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
            sx={{ color: 'black' }}  // Cambia el color de las estrellas a negro
        />
      </div>
      <div className="quote-text"><p>{quote}</p></div>
      <div className="quote-author"><p>{author}</p></div>
      <img src={logo} id={id} className="quote-logo" loading="lazy" alt="Quote Logo" />
    </a>
  );
};

export default QuoteCard;
