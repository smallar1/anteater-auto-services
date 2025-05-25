import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SignInButton, useUser } from '@clerk/clerk-react';
import './css/Navbar.css';
import logo from './images/Logo.png'; // Make sure the logo image exists

function Navbar() {
  const { isSignedIn, user } = useUser();
  const navigate = useNavigate();

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
        <Link to="/bookings" className="nav-link book-online">Book Online</Link>
      </div>

      <div className="nav-right">
        {!isSignedIn ? (
          <div className="auth-buttons">
            <SignInButton mode="modal" signUpUrl="/sign-in">
              <button className="nav-link login-toggle">Sign In / Sign Up</button>
            </SignInButton>
          </div>
        ) : (
          <div className="profile-menu">
            <Link to="/account" className="profile-link">
              <img 
                src={user?.imageUrl} 
                alt="Profile" 
                className="profile-image"
              />
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
