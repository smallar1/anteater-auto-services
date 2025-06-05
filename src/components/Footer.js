import React from 'react';
import './css/Footer.css';

function Footer() {
  return (
    <>
      <div className="footer-top-cta">
        <h2>Zot! Zot! Zot! Exceptional Auto Care Starts Here - Book Your Spot! <br />Contact Us Today!</h2>
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
            <iframe
              title="Anteater Auto Services Location"
              width="300"
              height="200"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps/embed/v1/place?key=AIzaSyDEkWDoVxuYKeGP4txlIuTvHA-uCBkyO2I&q=Aldrich+Hall,Irvine+CA+92697"
            />
          </a>
        </div>
      </footer>
    </>
  );
}

export default Footer;