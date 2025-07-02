import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState('');

  const fetchBookings = async () => {
    const token = localStorage.getItem('token');
    if (!token) return setError('Please log in to view your bookings.');

    try {
      const res = await axios.get('http://localhost:5000/api/bookings/my', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBookings(res.data);
    } catch (err) {
      setError(err.response?.data?.msg || 'Failed to load bookings');
    }
  };

  // 🛑 Handle booking cancellation
  const handleCancel = async (bookingId) => {
    const token = localStorage.getItem('token');
    if (!token) return alert('Please login first');

    if (!window.confirm('Are you sure you want to cancel this booking?')) return;

    try {
      await axios.delete(`http://localhost:5000/api/bookings/${bookingId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Update bookings in UI
      setBookings(bookings.filter((b) => b._id !== bookingId));
      alert('Booking cancelled');
    } catch (err) {
      alert(err.response?.data?.msg || 'Failed to cancel booking');
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div className="container mt-5">
      <h3 className="mb-4">My Bookings</h3>
      {error && <div className="alert alert-danger">{error}</div>}

      {bookings.length === 0 ? (
        <p>You have no bookings yet.</p>
      ) : (
        bookings.map((booking, i) => (
          <div key={i} className="card mb-3">
            <div className="card-body">
              <h5 className="card-title">
                {booking.event?.title || 'Event has been removed'}
              </h5>
              <p className="card-text">
                <strong>Date:</strong>{' '}
                {booking.event?.date
                  ? new Date(booking.event.date).toLocaleString()
                  : 'Unknown'}
                <br />
                <strong>Location:</strong> {booking.event?.location || 'Unknown'}
              </p>

              {/* ❌ Cancel Button */}
              <button
                className="btn btn-danger mt-2"
                onClick={() => handleCancel(booking._id)}
              >
                Cancel Booking
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default MyBookings;
