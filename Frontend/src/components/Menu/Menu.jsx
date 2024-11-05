import React, { useState, useEffect } from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { PATHS } from "../../../config/index.js";
import { FavoriteBorder as FavoriteBorderIcon } from '@mui/icons-material';
import './Menu.css';

/* Icons */
import {
  TelIcon,
  HeartIcon,
  BelgaIsoIcon,
  SearchIcon,
  EmprendimientosIcon,  
  WhatsappIcon,
} from "../Icons/Icons.jsx";

export const Menu = () => {
  const [sticky, setSticky] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [hideMenuInfo, setHideMenuInfo] = useState(false);
  const location = useLocation();

  useEffect(() => {
    let lastScrollTop = 0;

    const handleScroll = () => {
      const scrollTop = window.pageYOffset;

      if (scrollTop > lastScrollTop) {
        setHideMenuInfo(true);
      } else {
        setHideMenuInfo(false);
      }

      setSticky(scrollTop > 0);
      lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const isHome = location.pathname === "/";

  return (
    <Navbar
      expand="lg"
      bg={sticky || !isHome ? "white" : "transparent"}
      fixed="top"
      className={`menu-container ${sticky  ? "sticky" : ""}`}
    >
      <div className={`menu-info ${sticky ? "hidden" : ""}`}>
        <div className="menu-info-list">
          <div className="menu-info-item">La imprenta</div>
          <div className="menu-info-item">Belgrano C</div>
          <div className="menu-info-item">Belgrano R</div>
          <div className="menu-info-item-phone ">
            <WhatsappIcon className="logo-ws" /> +54 11 5263 3393
          </div>
        </div>
      </div>
      <div className="nav-flex-container">
        <Navbar.Brand className={`menu-brand-wrapper w-100 ${sticky  ? "sticky" : ""}`} as={Link} to="/">
          {!sticky && isHome ? (
            <img
              className="logo-img"
              src="/images/brand_red.svg"
              alt="Belga inmobiliaria"
            />
          ) : (
            <BelgaIsoIcon className="isobrand--img" />
          )}
        </Navbar.Brand>

        <Nav className="menu-nav">
          <Nav.Link
            as={Link}
            to="propertylist"
            className={`menu--link ${sticky || !isHome ? "sticky-link" : ""}`}
          >
            Quiero comprar
          </Nav.Link>
          
          <Nav.Link
            as={Link}
            to="emprendimientos"
            className={`menu--link ${sticky || !isHome ? "sticky-link" : ""}`}
          >
            Emprendimientos
          </Nav.Link>
          
          <Button
            className={` button--menu me-3 ${
              sticky || !isHome ? "sticky-link" : ""
            }`}
            as={Link}
            to={PATHS.QUIEROVENDER}
            variant={sticky || !isHome ? "outline-dark" : "outline-light"}
          >
            Quiero vender
          </Button>
        </Nav>

        {/* Botón hamburguesa personalizado */}
        <div
          className={`burger-button ${showMenu ? "active" : ""}`}
          onClick={() => setShowMenu(!showMenu)}
        >
          <div className="icon-wrapper">
            <div
              className={`burger-cross-custom ${showMenu ? "cross burger-dark" : " burger"
                } ${(!isHome || sticky) && !showMenu ? "burger-dark" : ""}`}  // Cambia el color según la condición
            >
              <div className="line" />
              <div className="line" />
              <div className="line" />
            </div>
          </div>
        </div>
      </div>

      <div className={`burger-menu ${showMenu ? "active" : ""}`}>
        <ul className=" px-5 py-3 burger-menu-list">
          <li className="emp burger-menu-item">
            <Link to={PATHS.EMPRENDIMIENTOS} className="burger--menu-link">
              <EmprendimientosIcon />
              <span className="link-text">Emprendimientos</span>
            </Link>
          </li>
          <li className="burger-menu-item">
            <Link to="/favorites" className="burger--menu-link">
            <FavoriteBorderIcon className="icon" />
            <span className="link-text">Favoritas</span>
            </Link>
          </li>
          <li className="burger-menu-item">
            <Link to={PATHS.BUSQUEDAS} className="burger--menu-link">
              <SearchIcon />
              <span className="link-text">Búsquedas</span>
            </Link>
          </li>
          <li className="burger-menu-item">
            <Link to={PATHS.CONOCEBELGA} className="burger--menu-link">
              <BelgaIsoIcon />
              <span className="link-text" spellCheck="false">Conocé Belga</span>
            </Link>
          </li>
          <li
            className="burger-menu-item"
            onClick={() => setShowMenu(false)}
          >
            <Link
              to={`${PATHS.ROOT}${PATHS.CONTACTO}`}
              className="burger--menu-link"
            >
              <TelIcon />
              <span className="link-text">Contáctanos</span>
            </Link>
          </li>
        </ul>
      </div>
    </Navbar>
  );
};

export default Menu;
