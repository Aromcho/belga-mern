import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <img src="/images/brand_red.svg" alt="Belga Inmobiliaria" />
        </Link>
        <ul className="navbar-menu">
          <li className="navbar-item">
            <Link to="/conoce-belga" className="navbar-link">Conoce Belga</Link>
          </li>
          <li className="navbar-item">
            <Link to="/emprendimientos" className="navbar-link">Emprendimientos</Link>
          </li>
          <li className="navbar-item">
            <Link to="/favoritos" className="navbar-link">Favoritos</Link>
          </li>
          <li className="navbar-item">
            <Link to="/quiero-vender" className="navbar-link">Quiero Vender</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
