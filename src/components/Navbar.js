import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './css/Navbar.css';
import logo from './images/Logo.png'; // Make sure the logo image exists

function Navbar() {
  const [showLogin, setShowLogin] = useState(false);

  const toggleLogin = () => {
    setShowLogin(prev => !prev);
  };

  return (
    <nav className="navbar">
      <div className="nav-left">
        <div className="logo-container">
          <Link to="/" className="logo-link">
            <img src={logo} alt="Company Logo" className="logo" />
            <span className="company-name">Anteater Auto Service</span>
          </Link>
        </div>
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/services" className="nav-link">Services</Link>
        <Link to="/about" className="nav-link">About Us</Link>
        <Link to="/contact" className="nav-link">Contact Us</Link>
        <Link to="/testimonials" className="nav-link">Testimonials</Link>
        <Link to="/account" className="nav-link">Account</Link>

        <Link to="/bookings" className="nav-link book-online">Book Online</Link>
      </div>

      <div className="nav-right">
        <div className="login-dropdown">
          <button onClick={toggleLogin} className="nav-link login-toggle">Login / Register ▾</button>
          {showLogin && (
            <div className="login-form-dropdown">
              <form>
                <input type="email" placeholder="Email" required />
                <input type="password" placeholder="Password" required />
                <button type="submit">Log In</button>
                <div className="register-hint">
                  Don't have an account? <Link to="/register">Register</Link>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
