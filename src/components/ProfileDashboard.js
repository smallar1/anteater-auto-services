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

  const [upcomingBooking, setUpcomingBooking] = useState(null);
  const [recentBookings, setRecentBookings] = useState([]);

  const [showReschedule, setShowReschedule] = useState(false);
  const [newDate, setNewDate] = useState('');
  const [newTime, setNewTime] = useState('');

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
        await fetch('http://localhost:5050/api/users/sync', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(syncPayload)
        });

        // Check if this is a new user
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

        // Fetch user's bookings
        const fetchBookings = async (userEmail) => {
          try {
            const encoded = encodeURIComponent(userEmail);
            const response = await fetch(`http://localhost:5050/api/bookings/email/${encoded}`);
            const bookings = await response.json();

            if (response.ok) {
              const upcoming = bookings.find(b =>
                new Date(b.date) >= new Date() && b.status === 'Confirmed'
              );
              const recent = bookings
                .filter(b => b.status === 'Completed')
                .sort((a, b) => new Date(b.date) - new Date(a.date))
                .slice(0, 2);

              setUpcomingBooking(upcoming);
              setRecentBookings(recent);
            }
          } catch (err) {
            console.error('Failed to fetch bookings:', err);
          }
        };

        await fetchBookings(syncPayload.email);
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
          {upcomingBooking ? (
            <>
              <p>{upcomingBooking.service}</p>
              <p>{upcomingBooking.date} @ {upcomingBooking.time}</p>
              <p>Status: {upcomingBooking.status}</p>

              {!showReschedule ? (
                <div className="button-group">
                  <button
                    className="submit-button"
                    onClick={() => setShowReschedule(true)}
                  >
                    Reschedule
                  </button>

                  <button
                    className="cancel-button"
                    onClick={async () => {
                      const confirmCancel = window.confirm("Are you sure you want to cancel your appointment?");
                      if (!confirmCancel) return;
                      const res = await fetch(`http://localhost:5050/api/bookings/${upcomingBooking._id}`, {
                        method: 'DELETE',
                      });

                      if (res.ok) {
                        alert("Appointment cancelled.");
                        setUpcomingBooking(null);
                        window.location.reload(); // Refresh to hide the cancelled appointment
                      } else {
                        alert("Failed to cancel appointment.");
                      }
                    }}
                  >
                    Cancel Appointment
                  </button>
                </div>
              ) : (
                <div>
                  <div className="reschedule-inputs">
                    <div className="form-group">
                      <label htmlFor="newDate">New Date:</label>
                      <input
                        type="date"
                        id="newDate"
                        value={newDate}
                        onChange={(e) => setNewDate(e.target.value)}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="newTime">New Time:</label>
                      <select
                        id="newTime"
                        value={newTime}
                        onChange={(e) => setNewTime(e.target.value)}
                        className="form-select"
                      >
                        <option value="">-- Select Time --</option>
                        <option value="09:00">09:00</option>
                        <option value="10:00">10:00</option>
                        <option value="11:00">11:00</option>
                        <option value="13:00">13:00</option>
                        <option value="14:00">14:00</option>
                        <option value="15:00">15:00</option>
                      </select>
                    </div>
                  </div>

                  <div className="button-group">
                    <button
                      className="submit-button"
                      onClick={async () => {
                        const res = await fetch(
                          `http://localhost:5050/api/bookings/${upcomingBooking._id}`,
                          {
                            method: 'PUT',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ date: newDate, time: newTime })
                          }
                        );

                        if (res.ok) {
                          alert('Appointment rescheduled!');
                          setShowReschedule(false);
                          setNewDate('');
                          setNewTime('');
                          window.location.reload();
                        } else {
                          alert('Failed to reschedule.');
                        }
                      }}
                      disabled={!newDate || !newTime}
                    >
                      Submit
                    </button>

                    <button
                      type="button"
                      className="cancel-appointment-button"
                      onClick={() => {
                        setShowReschedule(false);
                        setNewDate('');
                        setNewTime('');
                      }}
                      aria-label="Cancel Rescheduling"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </>
          ) : (
            <p>No upcoming appointments.</p>
          )}
        </div>


        <div className="profile-box box-3">
          <h2>Recent Activity</h2>
          {recentBookings.length > 0 && (
            <ul>
              {recentBookings.map((item, idx) => (
                <li key={idx}>{item.service} - {item.date} ({item.status})</li>
              ))}
            </ul>
          )}
          <button onClick={() => navigate('/history')}>
            View Full History
          </button>
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
