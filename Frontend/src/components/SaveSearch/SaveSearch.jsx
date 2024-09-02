import React from "react";
import { classes } from "helpers";
import { PlusIcon } from "components/icons";
import './SaveSearch.css';

export const SaveSearch = ({ className, onSaved, saved }) => {
  
  const [isLiked, setIsLiked] = React.useState(false);

  React.useEffect(() => {
    if(typeof saved === "boolean") setIsLiked(saved);
  }, [saved]);

  const handleSaveSearch = () => {
    if (onSaved) onSaved();
  }

  return (
    <div
      className={classes('save-search-container', className, { saved: isLiked })}
      onClick={handleSaveSearch}
    >
      <div className="save-text">GUARDAR BÚSQUEDA</div>
      <div className="icon-wrapper">
        <PlusIcon />
      </div>
    </div>
  );
};
