import { classes } from 'helpers';
import React from 'react';
import './ratingStart.css';  // Importando el archivo CSS correctamente

export const RatingStart = ({
  className,
  qtyItems = 5,
  itemSelected = 0,
  noSelect,
  msg
}) => {
  const [rating, setRating] = React.useState(itemSelected);
  const [hover, setHover] = React.useState(itemSelected);

  return (
    <div className={classes('rating-start-container', className, { noSelect })}>
      {[...Array(qtyItems)].map((_, index) => {
        index += 1;
        return (
          <button
            key={index}
            className={index <= (hover || rating) ? "on" : "off"}
            onClick={() => !noSelect && setRating(index)}
            onMouseEnter={() => setHover(index)}
            onMouseLeave={() => setHover(rating)}
          >
            <span className="item">&#9733;</span>
          </button>
        );
      })}
      {msg &&
        <span className="msg">
          {rating === 1 && 'Pésimo'}
          {rating === 2 && 'Malo'}
          {rating === 3 && 'Bueno'}
          {rating === 4 && 'Muy bueno'}
          {rating === 5 && '¡Excelente!'}
        </span>
      }
    </div>
  );
};
