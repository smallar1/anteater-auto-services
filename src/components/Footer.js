import React from 'react';
import './css/Footer.css';

function Footer() {
  return (
    <>
      <div className="footer-top-cta">
        <h3>Zot! Zot! Zot! Exceptional Auto Care Starts Here - Book Your Spot! <br />Contact Us Today!</h3>
        <a href="/bookings" className="footer-book-button">Book Online</a>
      </div>

      <footer>
        <div className="footer-content">
          <p>Location: Aldrich Hall, 101, Irvine, CA 92697</p>
          <p>Service Hours: Mon - Fri, 9 AM - 6 PM</p>
          <p>
            Phone:{' '}
            <a href="tel:+1234567890" className="footer-phone-link">
              +1 (234) 567-890
            </a>
          </p>
          <a
            href="https://www.google.com/maps/place/Aldrich+Hall,+Irvine,+CA+92697"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="https://maps.googleapis.com/maps/api/staticmap?center=Aldrich+Hall,+Irvine,+CA+92697&zoom=15&size=300x200&markers=color:red%7CAldrich+Hall,+Irvine,+CA+92697&key=YOUR_GOOGLE_MAPS_API_KEY"
              alt="Map to our location"
            />
          </a>
        </div>
      </footer>
    </>
  );
}

export default Footer;