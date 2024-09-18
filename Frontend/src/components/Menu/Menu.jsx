import React, { useState, useEffect } from "react";
import { Navbar, Nav, Button, NavDropdown } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { PATHS } from "../../../config/index.js";
import './Menu.css';

/* Icons */
import { TelIcon, HeartIcon, BelgaIsoIcon, SearchIcon, EmprendimientosIcon } from "../Icons/Icons.jsx";

export const Menu = () => {
  const [sticky, setSticky] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setSticky(window.pageYOffset > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const isHome = location.pathname === "/";

  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      bg={sticky || !isHome ? "light" : "transparent"}
      fixed="top"
      className={`menu-container ${sticky || !isHome ? "sticky" : ""}`}
    >
      <div className="nav-flex-container">
        <Navbar.Brand className="menu-brand-wrapper" as={Link} to="/">
          <img
            className="logo-img"
            src="/images/brand_red.svg"
            alt="Belga inmobiliaria"
          />
          <BelgaIsoIcon className="isobrand--img" />
        </Navbar.Brand>

        {/* Rest of Navbar Links */}
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto menu-nav">
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
              <EmprendimientosIcon /> Emprendimientos
            </Nav.Link>

            <Button
              className={`button--menu me-3 ${
                sticky || !isHome ? "sticky-link" : ""
              }`}
              as={Link}
              to={PATHS.QUIEROVENDER}
              variant={sticky || !isHome ? "outline-dark" : "outline-light"}
            >
              Quiero vender
            </Button>
            {/* Menú Hamburguesa Personalizado */}
            <div
              className={`burger-button ${showMenu ? "active" : ""}`}
              onMouseEnter={() => setShowMenu(true)}
              onClick={() => setShowMenu(!showMenu)}
            >
              <div className="icon-wrapper">
                <div
                  className={`burger-cross-custom ${
                    showMenu ? "cross" : "burger"
                  }`}
                >
                  {/*no usar la clase line*/}

                  <div className="line clase-alterna" />
                  <div className="line clase-alterna" />
                  <div className="line clase-alterna" />
                </div>
              </div>
            </div>

            {/* Menú desplegable */}
            <div className={`burger-menu ${showMenu ? "active" : ""}`}>
              <ul className="burger-menu-list">
                <li className="burger-menu-item">
                  <Link
                    to={PATHS.EMPRENDIMIENTOS}
                    className="burger--menu-link"
                  >
                    <EmprendimientosIcon />{" "}
                    <span className="link-text">Emprendimientos</span>
                  </Link>
                </li>
                <li className="burger-menu-item">
                  <Link to={PATHS.FAVORITES} className="burger--menu-link">
                    <HeartIcon /> <span className="link-text">Favoritas</span>
                  </Link>
                </li>
                <li className="burger-menu-item">
                  <Link to={PATHS.BUSQUEDAS} className="burger--menu-link">
                    <SearchIcon /> <span className="link-text">Búsquedas</span>
                  </Link>
                </li>
                <li className="burger-menu-item">
                  <Link to={PATHS.CONOCEBELGA} className="burger--menu-link">
                    <BelgaIsoIcon />{" "}
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
                    <TelIcon /> <span className="link-text">Contactanos</span>
                  </Link>
                </li>
              </ul>
            </div>
          </Nav>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
};

export default Menu;
