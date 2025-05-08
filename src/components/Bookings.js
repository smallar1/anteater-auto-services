import React, { useState } from 'react';
import './css/Bookings.css';

function Booking() {
  const [step, setStep] = useState(1);
  const [service, setService] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleNext = () => setStep(prev => prev + 1);
  const handleBack = () => setStep(prev => prev - 1);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ service, date, time, name, email });
    alert("Appointment booked!");
    // Add backend submission here if needed
  };

  return (
    <div className="booking-wrapper">
    <div className="booking-container" style={{ maxWidth: '400px', margin: '0 auto', padding: '1rem' }}>
      <h2>Book an Appointment</h2>

      {step === 1 && (
        <>
          <label>Select Service</label>
          <select value={service} onChange={(e) => setService(e.target.value)} required>
            <option value="">-- Choose a Service --</option>
            <option value="Oil Change">Oil Change</option>
            <option value="Tire Rotation">Tire Rotation</option>
            <option value="Brake Inspection">Brake Inspection</option>
          </select>
          <button onClick={handleNext} disabled={!service}>Next</button>
        </>
      )}

      {step === 2 && (
        <>
          <label>Select Date</label>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
          <div style={{ marginTop: '1rem' }}>
            <button onClick={handleBack}>Back</button>
            <button onClick={handleNext} disabled={!date}>Next</button>
          </div>
        </>
      )}

      {step === 3 && (
        <>
          <label>Select Time</label>
          <div style={{ display: 'grid', gap: '0.5rem' }}>
            {['09:00', '10:00', '11:00', '13:00', '14:00', '15:00'].map(t => (
              <button
                key={t}
                type="button"
                className={time === t ? 'selected' : ''}
                onClick={() => setTime(t)}
                style={{
                  background: time === t ? '#ffd700' : '#eee',
                  padding: '0.5rem',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                }}
              >
                {t}
              </button>
            ))}
          </div>
          <div style={{ marginTop: '1rem' }}>
            <button onClick={handleBack}>Back</button>
            <button onClick={handleNext} disabled={!time}>Next</button>
          </div>
        </>
      )}

      {step === 4 && (
        <form onSubmit={handleSubmit}>
          <label>Name</label>
          <input value={name} onChange={(e) => setName(e.target.value)} required />

          <label>Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

          <div style={{ marginTop: '1rem', marginBottom: '1.5rem' }}>
            <p><strong>Service:</strong> {service}</p>
            <p><strong>Date:</strong> {date}</p>
            <p><strong>Time:</strong> {time}</p>
          </div>

          <button onClick={handleBack} type="button">Back</button>
          <button type="submit">Confirm Booking</button>
        </form>
      )}
    </div>
    </div>
  );
}

export default Booking;
