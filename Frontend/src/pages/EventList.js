import React, { useEffect, useState } from 'react';
import axios from 'axios';

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch events on mount
  useEffect(() => {
    axios.get('http://localhost:5000/api/events')
      .then((res) => {
        setEvents(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  // ✅ Handle booking
  const handleBook = async (eventId) => {
    const token = localStorage.getItem('token');
    if (!token) return alert('Please login first to book events');

    try {
      const res = await axios.post(
        'http://localhost:5000/api/bookings',
        { eventId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert(res.data.msg);
    } catch (err) {
      alert(err.response?.data?.msg || 'Booking failed');
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Upcoming Events</h2>

      {loading ? (
        <p>Loading events...</p>
      ) : events.length === 0 ? (
        <p>No events found.</p>
      ) : (
        events.map((event) => (
          <div key={event._id} className="card mb-3">
            <div className="card-body">
              <h4 className="card-title">{event.title}</h4>
              <p className="card-text">{event.description}</p>
              <p className="card-text"><strong>Location:</strong> {event.location}</p>
              <p className="card-text"><strong>Date:</strong> {new Date(event.date).toLocaleString()}</p>
              <p className="card-text"><strong>Price:</strong> ₹{event.price}</p>

              {/* ✅ Book Now Button */}
              <button
                className="btn btn-primary"
                onClick={() => handleBook(event._id)}
              >
                Book Now
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default EventList;
