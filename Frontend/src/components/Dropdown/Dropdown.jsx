import React, { useState, useEffect } from 'react';
import './Dropdown.css'; // Importa el archivo CSS común

const Dropdown = ({ value, className, placeholder, children, close }) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (typeof close === 'boolean') {
      setOpen(false);
    }
  }, [close]);

  return (
    <div className={`dropdown-styled ${className}`}>
      <span className="dropdown-label" onClick={() => setOpen(!open)}>
        {value || placeholder}
      </span>
      {open && (
        <>
          <div className="dropdown-div-close" onClick={() => setOpen(false)} />
          <div className="dropdown-list" onMouseLeave={() => setOpen(false)}>
            {children}
          </div>
        </>
      )}
    </div>
  );
};

export default Dropdown;
