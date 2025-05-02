import React, { useState } from 'react';
import './css/Testimonials.css';

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([
    {
      name: "Jane D.",
      text: "Fast and professional service. Highly recommend!",
      car: "Toyota Corolla",
    },
    {
      name: "Mark R.",
      text: "Excellent customer support and affordable prices.",
      car: "Ford F-150",
    },
  ]);

  const [formData, setFormData] = useState({
    name: '',
    car: '',
    text: ''
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.text) {
      setTestimonials(prev => [formData, ...prev]);
      setFormData({ name: '', car: '', text: '' });
    }
  };

  return (
    <section className="testimonials-section">
      <div className="testimonials-content">
        {/* Testimonials Heading */}
        <h2>Customer Reviews</h2>

        {/* Testimonials Display */}
        <div className="testimonials-container">
          {testimonials.map((testimonial, index) => (
            <div className="testimonial-card" key={index}>
              <p className="testimonial-text">"{testimonial.text}"</p>
              <p className="testimonial-name">— {testimonial.name}{testimonial.car && `, ${testimonial.car}`}</p>
            </div>
          ))}
        </div>

        {/* Leave a Review Form Heading */}
        <h3 className="form-heading">Leave a Review</h3>

        {/* Review Form */}
        <form className="testimonial-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Your name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="car"
            placeholder="Your car model (optional)"
            value={formData.car}
            onChange={handleChange}
          />
          <textarea
            name="text"
            placeholder="Your review"
            value={formData.text}
            onChange={handleChange}
            required
          ></textarea>
          <button type="submit">Submit Review</button>
        </form>
      </div>
    </section>
  );
};

export default Testimonials;
