import React, { useState } from 'react';
import { NavLink } from 'react-router-dom'
import { Menu, Search, User, X } from 'lucide-react'
import Logo from '../assets/Logo.png';
import './Navbar.css';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const links = ['Home', 'Genre', 'Movies', 'Tv Shows', 'Anime', 'Subscription'];
  return (
    <nav className="navbar">
      <div className="brand">
        <div className="logo">
          <img src={Logo} alt="Logo" className="w-12 h-12" />
        </div>
        <button
          className="menu-toggle"
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
      <div className={`links ${isMenuOpen ? 'open' : ''}`}>
        {links.map((link) => (
          <NavLink
            key={link}
            to={`${link === 'Tv Shows' ? '/' : `/${link.toLowerCase()}`}`}
            className={({ isActive }) => `link ${isActive ? 'active' : ''}`}
            onClick={() => setIsMenuOpen(false)}
          >
            {link}
          </NavLink>
        ))}
      </div>
      <div className="login">
        <Search className="mr-1 cursor-pointer" />
        <button className="login-btn">
          <User />
          <NavLink to="/login">Sign in/Sign up</NavLink>
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
