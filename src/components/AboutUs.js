import React from 'react';
import './css/AboutUs.css';

function AboutUs() {
  return (
    <div className="about-us-page"> {/* Full-width background wrapper */}
      <div className="about-us-container">
        <h1>About Us</h1>
        <div className="about-us-content">
          <p>
            Welcome to our company! We are a team of automotive professionals
            dedicated to providing top-quality services and customer satisfaction.
          </p>
          <p>
            Our mission is to keep your vehicle in top condition, whether it’s
            routine maintenance or more advanced repairs. With years of experience,
            we use the latest tools and techniques to get the job done right.
          </p>
          <h2>Our Mission</h2>
          <p>
            We are committed to delivering fast, reliable, and affordable automotive
            services, ensuring that our customers leave happy and their cars perform
            at their best.
          </p>
          <h2>Our Team</h2>
          <p>
            Our team consists of experienced and passionate mechanics who have a
            deep understanding of vehicles and a love for fixing and maintaining them.
            Every member is highly trained to ensure your car gets the best care.
          </p>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
