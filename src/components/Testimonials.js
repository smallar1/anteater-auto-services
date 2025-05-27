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
        <h1>Customer Reviews</h1>

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
        <h2 className="form-heading">Leave a Review</h2>

        {/* Review Form */}
        <form className="testimonial-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Your Name</label>
            <input
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="car">Your Car Model <span className="optional">(optional)</span></label>
            <input
              id="car"
              type="text"
              name="car"
              value={formData.car}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="text">Your Review</label>
            <textarea
              id="text"
              name="text"
              value={formData.text}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <button type="submit">Submit Review</button>
        </form>
      </div>
    </section>
  );
};

export default Testimonials;
