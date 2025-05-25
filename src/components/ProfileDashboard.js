import React, { useState } from 'react';
import './css/ProfileDashboard.css';
import { useNavigate } from 'react-router-dom';
import { useUser, useClerk } from '@clerk/clerk-react';

function ProfileDashboard() {
  const { user } = useUser();
  const { signOut } = useClerk();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    phoneNumber: user?.phoneNumbers?.[0]?.phoneNumber || '',
    address: user?.publicMetadata?.address || ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Example booking data - in a real app, this would come from your backend
  const upcomingBooking = {
    service: "Brake Inspection",
    date: "2025-05-10",
    time: "10:00 AM",
    status: "Confirmed"
  };

  const recentBookings = [
    { service: "Oil Change", date: "2025-04-15", status: "Completed" },
    { service: "Tire Rotation", date: "2025-03-20", status: "Completed" }
  ];

  const formatPhoneNumber = (number) => {
    const cleaned = number.replace(/\D/g, '');
    if (cleaned.length === 10) {
      return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6, 10)}`;
    }
    return number;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      // Validate phone number
      const cleanedNumber = formData.phoneNumber.replace(/\D/g, '');
      if (cleanedNumber && !/^\d{10}$/.test(cleanedNumber)) {
        setError('Please enter a valid 10-digit phone number');
        return;
      }

      // Format phone number before saving
      setFormData(prev => ({
        ...prev,
        phoneNumber: formatPhoneNumber(cleanedNumber)
      }));

      // Update local state
      setSuccess('Profile updated successfully!');
      setIsEditing(false);
      alert('This is temporary until we have a database set up');
    } catch (err) {
      setError(err.message || 'Failed to update profile. Please try again.');
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <div className="profile-dashboard">
      <div className="dashboard-grid">
        <div className="profile-box box-1">
          <h2>{user?.fullName || 'User'}</h2>
          <p>Email: {user?.primaryEmailAddress?.emailAddress}</p>
          
          {!isEditing ? (
            <>
              <p>Phone: {formData.phoneNumber || 'Not provided'}</p>
              <p>Address: {formData.address || 'Not provided'}</p>
              <button onClick={() => setIsEditing(true)}>Edit Info</button>
              <button onClick={handleSignOut} className="sign-out-button">Sign Out</button>
            </>
          ) : (
            <form onSubmit={handleSubmit} className="edit-form">
              <div className="form-group">
                <label htmlFor="phoneNumber">Phone Number:</label>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  placeholder="Enter phone number (e.g., 1234567890)"
                  pattern="[0-9]{10}"
                  title="Please enter a 10-digit phone number"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="address">Address:</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Enter your address"
                />
              </div>

              {error && <p className="error-message">{error}</p>}
              {success && <p className="success-message">{success}</p>}

              <div className="button-group">
                <button type="submit" className="save-button">Save Changes</button>
                <button type="button" onClick={() => setIsEditing(false)} className="cancel-button">
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>

        <div className="profile-box box-2">
          <h3>Upcoming Appointment</h3>
          <p>{upcomingBooking.service}</p>
          <p>{upcomingBooking.date} @ {upcomingBooking.time}</p>
          <p>Status: {upcomingBooking.status}</p>
          <button>Reschedule</button>
        </div>

        <div className="profile-box box-3">
          <h3>Recent Activity</h3>
          <ul>
            {recentBookings.map((item, idx) => (
              <li key={idx}>{item.service} - {item.date} ({item.status})</li>
            ))}
          </ul>
          <button>View Full History</button>
        </div>
      </div>

      <div className="cta-banner">
        <p>⭐ Leave a review for your last service and get 10% off your next visit!</p>
        <button onClick={() => navigate('/testimonials')}>Leave Feedback</button>
      </div>
    </div>
  );
}

export default ProfileDashboard;
