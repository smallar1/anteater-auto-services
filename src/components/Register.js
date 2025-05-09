import React from 'react';
import './css/Register.css'; // adjust if your path differs

function Register() {
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;

    console.log('Register info:', { name, email, password });
  };

  return (
    <div className="register-page">
      <h2>Create an Account</h2>
      <form className="register-form" onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Full Name" required />
        <input type="email" name="email" placeholder="Email Address" required />
        <input type="password" name="password" placeholder="Password" required />
        <input type="tel-number" name="tel" placeholder="Phone Number" required />
        <input type="Address" name="address" placeholder="Address" required />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;