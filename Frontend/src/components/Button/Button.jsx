import React from "react";
import { Link } from "react-router-dom"; // Importa Link desde react-router-dom
import { classes } from "../../helpers/index.js"; // Ajusta la ruta según tu estructura de carpetas
import { MailIcon } from "../Icons/Icons"; // Ajusta la ruta según tu estructura de carpetas
import "./Button.css"; // Archivo CSS para los estilos

const Button = ({
  link = "#",
  target = "_self",
  text,
  sendStatus,
  className,
  onClick,
  children,
  type,
}) => {
  if (onClick && !sendStatus) {
    return (
      <a className={classes(className, type)} onClick={onClick}>
        {text}
      </a>
    );
  }
  if (sendStatus) {
    return (
      <a
        className={classes(className, type, sendStatus)}
        onClick={onClick}
      >
        <div className="wrapper-text">
          <div className="text">Enviado</div>
          <div className="text">
            <MailIcon />
          </div>
          <div className="text">Enviar</div>
        </div>
      </a>
    );
  }
  return (
    <Link to={link} target={target} className={classes(className, type)}>
      {children || text}
    </Link>
  );
};

export default Button;

