import React, { useState, useEffect } from "react";
import { PATHS } from "../../../config/index.js";
import { Container } from "react-bootstrap";
import { classes, getWindowDimensions } from "../../helpers/index.js";
import Button from "../Button/Button.jsx";
import './Menu.css';

/* Icons */
import {
  TelIcon,
  WhatsappIcon,
  BelgaIsoIcon,
  SearchIcon,
  HeartIcon,
  EmprendimientosIcon,
} from "../Icons/Icons.jsx";
import { Link } from "react-router-dom";

export const Menu = ({ theme = "transparent" }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [sticky, setSticky] = useState(false);
  const [scrollTop, setScrollTop] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const st = window.pageYOffset;
      setSticky(st > 0);
      setScrollTop(st);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    const handleResize = () => setWindowDimensions(getWindowDimensions());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = windowDimensions && windowDimensions <= 1100;

  return (
    <div className={`menu-container ${classes(theme, { sticky })}`} id="menuItem">
      <div className="menu-info">
        <ul className="menu-info-list">
          <li className="menu-info-item">La imprenta</li>
          <li className="menu-info-item">Belgrano C</li>
          <li className="menu-info-item">Belgrano R</li>
          <li className="menu-info-item">
            <a
              href="https://api.whatsapp.com/send?phone=5491152633393&text=Hola%20Belga!%20%F0%9F%91%8B%20Quisiera%20hacerles%20una%20consulta."
              className="info--link"
              target="_blank"
              rel="noopener noreferrer"
            >
              <WhatsappIcon /> +54 11 5263 3393
            </a>
          </li>
        </ul>
      </div>

      <div className={`menu-wrapper ${scrollTop > 0 ? 'scrolled' : ''}`}>
        <div className="container-nav menu--container">
          <Link to={"/"}>
            <div className="menu-brand-wrapper">
              <img
                className="menu-brand"
                src="/images/brand_red.svg"
                alt="Belga inmobiliaria"
                title="Belga inmobiliaria"
              />
              <BelgaIsoIcon className="isobrand--img" />
            </div>
          </Link>

          <ul className="menu-list ">
            <li className="menu-item">
              <Link to={"propertylist"} className="menu--link">
                Quiero comprar <div className="underline-link" />
              </Link>
            </li>
            <li className="menu-item">
              <a href={PATHS.EMPRENDIMIENTOS} className="menu--link">
                Emprendimientos <div className="underline-link" />
              </a>
            </li>
            <li className="menu-item">
              <Button text="Quiero vender" className="button--menu" link={PATHS.QUIEROVENDER} />
            </li>
          </ul>
        </div>

        <div
          className={`burger-button ${showMenu ? 'active' : ''}`}
          onMouseEnter={() => isMobile ? "" : setShowMenu(true)}
          onClick={() => setShowMenu(!showMenu)}
        >
          <div className="icon-wrapper">
            <div className={`burger-cross-custom ${showMenu ? 'cross' : 'burger'}`}>
              <div className="line" />
              <div className="line" />
              <div className="line" />
            </div>
          </div>
        </div>

        <div
          className={`burger-menu ${showMenu ? 'active' : ''}`}
          onMouseLeave={() => setShowMenu(false)}
        >
          <ul className="burger-menu-list">
            <li className="burger-menu-item emprendimientos--link">
              <a href={PATHS.EMPRENDIMIENTOS} className="burger--menu-link">
                <EmprendimientosIcon /> <span className="link-text">Emprendimientos</span>
              </a>
            </li>
            <li className="burger-menu-item">
              <a href={PATHS.FAVORITES} className="burger--menu-link">
                <HeartIcon className="heart--icon" />
                <span className="link-text">
                  Favoritas <div className="underline-link-burger" />
                </span>
              </a>
            </li>
            <li className="burger-menu-item">
              <a href={PATHS.BUSQUEDAS} className="burger--menu-link">
                <SearchIcon />
                <span className="link-text">
                  Búsquedas <div className="underline-link-burger" />
                </span>
              </a>
            </li>
            <li className="burger-menu-item">
              <a href={PATHS.CONOCEBELGA} className="burger--menu-link">
                <BelgaIsoIcon />
                <span className="link-text">
                  Conocé Belga <div className="underline-link-burger" />
                </span>
              </a>
            </li>
            <li className="burger-menu-item" onClick={() => setShowMenu(false)}>
              <a href={`${PATHS.ROOT}${PATHS.CONTACTO}`} className="burger--menu-link">
                <TelIcon />
                <span className="link-text">
                  Contactanos <div className="underline-link-burger" />
                </span>
              </a>
            </li>
          </ul>
          <Button
            text="Quiero comprar"
            className="outline black comprar--button-mobile"
            link={PATHS.VENTA}
          />
        </div>
      </div>
    </div>
  );
};

export default Menu;
  