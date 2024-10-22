import React from 'react';
import Button from '../Button/Button.jsx';
import { classes } from '../../helpers/index.js';
import './Title.css';

const Title = ({
  className,
  title,
  textButton = 'Ver más',
  linkButton,
  vertical,
  buttonStyle = 'outline',
}) => {
  return (
    <div className={classes('title-container', className, { vertical })}>
      <h2 className="title-text">{title}</h2>
      <div className="line" />
      <Button
        className="button--title text-decoration-none"
        text={textButton}
        type={buttonStyle}
        link={linkButton}
      />
    </div>
  );
};

export default Title;
