import React from 'react';
import './Services.css';

const servicesList = [
  {
    id: 1,
    title: 'Oil Change',
    description: 'Professional oil change service using high-quality synthetic oils to keep your engine running smoothly.',
  },
  {
    id: 2,
    title: 'Brake Service',
    description: 'Complete brake inspection and repair service including pad replacement and rotor resurfacing.',
  },
  {
    id: 3,
    title: 'Tire Services',
    description: 'Tire rotation, balancing, alignment, and new tire installation to ensure optimal vehicle performance.',
  },
  {
    id: 4,
    title: 'Engine Diagnostics',
    description: 'Advanced computer diagnostics to identify and resolve engine problems efficiently.',
  },
  {
    id: 5,
    title: 'AC Service',
    description: 'Complete air conditioning system diagnosis, repair, and maintenance to keep you cool.',
  },
  {
    id: 6,
    title: 'Battery Service',
    description: 'Battery testing, maintenance, and replacement services to keep your vehicle starting reliably.',
  },
  {
    id: 7,
    title: 'Transmission Service',
    description: 'Comprehensive transmission maintenance and repair services for manual and automatic transmissions.',
  },
  {
    id: 8,
    title: 'Wheel Alignment',
    description: 'Precision wheel alignment service to improve handling and extend tire life.',
  }
];

function Services() {
  return (
    <div className = "services-background">
      <div className="services-container">
        <h1>Our Services</h1>
        <div className="services-grid">
          {servicesList.map((service) => (
            <div key={service.id} className="service-box">
              <div className="service-content">
                <div className="service-front">
                  <span className="service-icon">{service.icon}</span>
                  <h3>{service.title}</h3>
                </div>
                <div className="service-back">
                  <p>{service.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Services; 