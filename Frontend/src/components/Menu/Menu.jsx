import React, { useState, useEffect } from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { PATHS } from "../../../config/index.js";
import './Menu.css';

/* Icons */
import {
  TelIcon,
  HeartIcon,
  BelgaIsoIcon,
  SearchIcon,
  EmprendimientosIcon,  
  WhatsappIcon,  // Asegúrate de que este ícono esté importado correctamente
} from "../Icons/Icons.jsx";

export const Menu = () => {
  const [sticky, setSticky] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [hideMenuInfo, setHideMenuInfo] = useState(false); // Nuevo estado para ocultar solo menu-info
  const location = useLocation();

  useEffect(() => {
    let lastScrollTop = 0;

    const handleScroll = () => {
      const scrollTop = window.pageYOffset;

      if (scrollTop > lastScrollTop) {
        // Si el usuario hace scroll hacia abajo
        setHideMenuInfo(true);
      } else {
        // Si el usuario hace scroll hacia arriba
        setHideMenuInfo(false);
      }

      setSticky(scrollTop > 0); // Mantener sticky el navbar principal
      lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // Evitar valores negativos en el scroll
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
      bg={sticky || !isHome ? "light" : "transparent"}
      fixed="top"
      className={`menu-container ${sticky || !isHome ? "sticky" : ""}`}
    >
      <div className={`menu-info ${sticky || !isHome ? "hidden" : ""}`}>
        <div className="menu-info-list">
          <div className="menu-info-item">La imprenta</div>
          <div className="menu-info-item">Belgrano C</div>
          <div className="menu-info-item">Belgrano R</div>
          <div className="menu-info-item">
            <Link href="https://api.whatsapp.com/send?phone=5491152633393&text=Hola%20Belga!%20%F0%9F%91%8B%20Quisiera%20hacerles%20una%20consulta.">
              <a className="info--link" target="_blank">
                <WhatsappIcon /> +54 11 5263 3393
              </a>
            </Link>
          </div>
        </div>
      </div>
      <div className="nav-flex-container">
        <Navbar.Brand className="menu-brand-wrapper w-100" as={Link} to="/">
          {/* Cambiar el logo según la posición del scroll */}
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

        {/* Menú normal */}
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
          {/* <Nav.Link
            as={Link}
            to="blog"
            className={`menu--link ${sticky || !isHome ? "sticky-link" : ""}`}
          >
            Noticias
          </Nav.Link> */}
          
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
              className={`burger-cross-custom ${
                showMenu ? "cross" : "burger"
              }`}
            >
              <div className="line" />
              <div className="line" />
              <div className="line" />
            </div>
          </div>
        </div>
      </div>

      {/* Menú desplegable para móvil */}
      <div className={`burger-menu ${showMenu ? "active" : ""}`}>
        <ul className="burger-menu-list">
          <li className="burger-menu-item">
            <Link to={PATHS.EMPRENDIMIENTOS} className="burger--menu-link">
              <EmprendimientosIcon />
              <span className="link-text">Emprendimientos</span>
            </Link>
          </li>
          <li className="burger-menu-item">
            <Link to={PATHS.FAVORITES} className="burger--menu-link">
              <HeartIcon />
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
              <span className="link-text">Conocé Belga</span>
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
