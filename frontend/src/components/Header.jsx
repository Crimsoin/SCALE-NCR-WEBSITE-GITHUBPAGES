import React, { useState } from 'react';
import './Header.css';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assests/images/Header/Logo.png';

const Header = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="header-wrapper">
        <Link to="/" onClick={closeMenu}>
          <img src={logo} alt="SCALE Logo" className="logo" />
        </Link>
        
        <button className="burger-menu" onClick={toggleMenu} aria-label="Toggle menu">
          <span className={`burger-line ${isMenuOpen ? 'open' : ''}`}></span>
          <span className={`burger-line ${isMenuOpen ? 'open' : ''}`}></span>
          <span className={`burger-line ${isMenuOpen ? 'open' : ''}`}></span>
        </button>

        <nav className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
          <Link to="/" className={`nav-link ${isActive('/') && location.pathname === '/' ? 'active' : ''}`} onClick={closeMenu}>
            HOME
          </Link>
          <Link to="/about" className={`nav-link ${isActive('/about') ? 'active' : ''}`} onClick={closeMenu}>
            ABOUT
          </Link>
          <Link to="/directory" className={`nav-link ${isActive('/directory') ? 'active' : ''}`} onClick={closeMenu}>
            DIRECTORY
          </Link>
          <Link to="/events" className={`nav-link ${isActive('/events') ? 'active' : ''}`} onClick={closeMenu}>
            EVENTS
          </Link>
          <Link to="/contact-us" className={`nav-link ${isActive('/contact-us') ? 'active' : ''}`} onClick={closeMenu}>
            CONTACT US
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;