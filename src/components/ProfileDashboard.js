import React, { useState, useEffect } from 'react';
import './css/ProfileDashboard.css';
import { useNavigate } from 'react-router-dom';
import { useUser, useClerk } from '@clerk/clerk-react';

function ProfileDashboard() {
  const { user } = useUser();
  const { signOut } = useClerk();
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ phoneNumber: '', address: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isNewUser, setIsNewUser] = useState(false);

  // Sync user and fetch from MongoDB on component mount
  useEffect(() => {
    const syncAndFetchUser = async () => {
      if (!user?.primaryEmailAddress?.emailAddress) return;

      const syncPayload = {
        name: user.fullName,
        email: user.primaryEmailAddress.emailAddress,
        phone: user.phoneNumbers?.[0]?.phoneNumber || '',
        address: user.publicMetadata?.address || ''
      };

      try {
        // Sync the user to the database
        const syncResponse = await fetch('http://localhost:5050/api/users/sync', { // 3.144.135.133:5050 for production
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(syncPayload)
        });

        const syncData = await syncResponse.json();
        
        // Check if this is a new user
        if (syncResponse.status === 201) {
          setIsNewUser(true);
        }

        // Now fetch the user from the database
        const encodedEmail = encodeURIComponent(syncPayload.email);
        const res = await fetch(`http://localhost:5050/api/users/email/${encodedEmail}`);
        const data = await res.json();

        if (res.ok) {
          setFormData({
            phoneNumber: data.phone || '',
            address: data.address || ''
          });
        } else {
          console.warn(data.error || 'User not found in DB');
        }
      } catch (err) {
        console.error('Failed to sync/fetch user:', err);
      }
    };

    syncAndFetchUser();
  }, [user]);

  const formatPhoneNumber = (number) => {
    const cleaned = number.replace(/\D/g, '');
    if (cleaned.length === 10) {
      return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6, 10)}`;
    }
    return number;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const cleanedNumber = formData.phoneNumber.replace(/\D/g, '');
      if (cleanedNumber && !/^\d{10}$/.test(cleanedNumber)) {
        setError('Please enter a valid 10-digit phone number');
        return;
      }

      const formattedNumber = formatPhoneNumber(cleanedNumber);
      const encodedEmail = encodeURIComponent(user.primaryEmailAddress.emailAddress);

      const res = await fetch(`http://localhost:5050/api/users/email/${encodedEmail}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone: formattedNumber,
          address: formData.address
        })
      });

      if (res.ok) {
        setFormData({
          phoneNumber: formattedNumber,
          address: formData.address
        });
        setSuccess('Profile updated successfully!');
        setIsEditing(false);
      } else {
        const data = await res.json();
        setError(data.error || 'Failed to update user');
      }
    } catch (err) {
      console.error(err);
      setError('An error occurred while updating.');
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

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

  return (
    <div className="profile-dashboard">
      <div className="dashboard-grid">
        <div className="profile-box box-1">
          <h1>{user?.fullName || 'User'}</h1>
          <p>Email: {user?.primaryEmailAddress?.emailAddress}</p>

          {isNewUser && (
            <div className="new-user-message">
              <p>Welcome! Please update your contact information below.</p>
            </div>
          )}

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
          <h2>Upcoming Appointment</h2>
          <p>{upcomingBooking.service}</p>
          <p>{upcomingBooking.date} @ {upcomingBooking.time}</p>
          <p>Status: {upcomingBooking.status}</p>
          <button>Reschedule</button>
        </div>

        <div className="profile-box box-3">
          <h2>Recent Activity</h2>
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
