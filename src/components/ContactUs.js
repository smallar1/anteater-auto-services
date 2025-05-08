import React, { useState } from 'react';
import './css/ContactUs.css';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Quote request submitted successfully!');
    setFormData({
      name: '',
      email: '',
      phone: '',
      service: '',
      message: '',
    });
  };

  return (
    <div className="contact-container">
      <h1>Request a Quote</h1>
      <form className="contact-form" onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" name="name" required value={formData.name} onChange={handleChange} />
        </label>
        <label>
          Email:
          <input type="email" name="email" required value={formData.email} onChange={handleChange} />
        </label>
        <label>
          Phone Number:
          <input type="tel" name="phone" required value={formData.phone} onChange={handleChange} />
        </label>
        <label>
          Service Needed:
          <select name="service" required value={formData.service} onChange={handleChange}>
            <option value="">-- Select a Service --</option>
            <option value="Oil Change">Oil Change</option>
            <option value="Brake Service">Brake Service</option>
            <option value="Tire Services">Tire Services</option>
            <option value="Engine Diagnostics">Engine Diagnostics</option>
            <option value="AC Service">AC Service</option>
            <option value="Other">Other</option>
          </select>
        </label>
        <label>
          Additional Details:
          <textarea
            name="message"
            rows="4"
            value={formData.message}
            onChange={handleChange}
          ></textarea>
        </label>

        <button type="submit">Submit Quote Request</button>
      </form>
    </div>
  );
}

export default Contact;
