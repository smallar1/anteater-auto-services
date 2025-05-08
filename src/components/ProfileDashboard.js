import React from 'react';
import './css/ProfileDashboard.css';

function ProfileDashboard() {
  const user = {
    name: "Peter Anteater",
    email: "peter@example.com",
    phone: "+1 (234) 567-890",
    address: "1234 Ant Ave",
    upcomingBooking: {
      service: "Brake Inspection",
      date: "2025-05-10",
      time: "10:00 AM",
      status: "Confirmed"
    },
    recentBookings: [
      { service: "Oil Change", date: "2025-04-15", status: "Completed" },
      { service: "Tire Rotation", date: "2025-03-20", status: "Completed" }
    ]
  };

  return (
    <div className="profile-dashboard">
      <div className="dashboard-grid">
        <div className="profile-box box-1">
          <h2>{user.name}</h2>
          <p>Email: {user.email}</p>
          <p>Phone: {user.phone}</p>
          <p>Address: {user.address}</p>
          <button>Edit Info</button>
        </div>

        <div className="profile-box box-2">
          <h3>Upcoming Appointment</h3>
          <p>{user.upcomingBooking.service}</p>
          <p>{user.upcomingBooking.date} @ {user.upcomingBooking.time}</p>
          <p>Status: {user.upcomingBooking.status}</p>
          <button>Reschedule</button>
        </div>

        <div className="profile-box box-3">
          <h3>Recent Activity</h3>
          <ul>
            {user.recentBookings.map((item, idx) => (
              <li key={idx}>{item.service} - {item.date} ({item.status})</li>
            ))}
          </ul>
          <button>View Full History</button>
        </div>
      </div>

      <div className="cta-banner">
        <p>⭐ Leave a review for your last service and get 10% off your next visit!</p>
        <button>Leave Feedback</button>
      </div>
    </div>
  );
}

export default ProfileDashboard;
