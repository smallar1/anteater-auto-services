import React, { useEffect, useState } from 'react';
import { useUser } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import './css/ProfileDashboard.css';

function BookingHistory() {
  const { user } = useUser();
  const navigate = useNavigate();
  const [confirmed, setConfirmed] = useState([]);
  const [completed, setCompleted] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      const email = user?.primaryEmailAddress?.emailAddress;
      if (!email) return;

      const encoded = encodeURIComponent(email);
      const res = await fetch(`http://localhost:5050/api/bookings/email/${encoded}`);
      const data = await res.json();

      if (res.ok) {
        const now = new Date();

        const grouped = {
          confirmed: [],
          completed: [],
        };

        data.forEach((b) => {
          if (b.status === 'Completed') grouped.completed.push(b);
          else if (b.status === 'Confirmed') grouped.confirmed.push(b);
        });

        setConfirmed(grouped.confirmed);
        setCompleted(grouped.completed);
      } else {
        console.error('Failed to load history');
      }
    };

    fetchHistory();
  }, [user]);

  const renderSection = (title, bookings, cssClass) => (
  <div className="history-section">
    <h2>{title}</h2>
    {bookings.length > 0 ? (
      <ul className="history-list">
        {bookings.map((b, idx) => (
          <li key={idx}>
            <span className="service">{b.service}</span> — {b.date} @ {b.time}{' '}
            <span className={`status ${cssClass}`}>({b.status})</span>
          </li>
        ))}
      </ul>
    ) : (
      <p className="empty-message">No {title.toLowerCase()}.</p>
    )}
  </div>
  );

  return (
    <div className="booking-wrapper">
      <div className="booking-container">
        <h1>Your Appointment History</h1>

        {renderSection('Confirmed Appointments', confirmed, 'confirmed')}
        {renderSection('Completed Appointments', completed, 'completed')}

        <button className="blue-button" onClick={() => navigate('/account')}>
          ← Back to My Account
        </button>
      </div>
    </div>
  );

}

export default BookingHistory;
