import React from 'react';
import { BelgaIsoIcon } from '../Icons/Icons';
import './titlewithicon.css';

export const TitleWithIcon = ({ className, text }) => {
  return (
    <div className={`title-container ${className}`}>
      <BelgaIsoIcon />
      <div className="footer-title-text">{text}</div>
    </div>
  );
};
