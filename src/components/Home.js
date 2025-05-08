import React from 'react';
import './css/Home.css';

function Home() {
  return (
    <div className="home-page"> {/* Wrapper with background image */}
      <div className="home">
        <div className="mission-statement">
          <h2>Our Mission</h2>
          <p>At Anteater Auto Service, our mission is to deliver dependable, high-quality automotive care with integrity and efficiency. 
            We are committed to keeping our community safe and confident on the road by combining expert craftsmanship, 
            cutting-edge technology, and exceptional customer service in everything we do.</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
