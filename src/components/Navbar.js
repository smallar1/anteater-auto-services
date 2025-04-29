import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/services" className="nav-link">Services</Link>
        <Link to="/about" className="nav-link">About Us</Link>
        <Link to="/contact" className="nav-link">Contact Info</Link>
      </div>
      <div className="nav-right">
        <Link to="/book" className="nav-link book-online">Book Online</Link>
      </div>
    </nav>
  );
}

export default Navbar; 