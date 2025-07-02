import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateEvent = () => {
  const navigate = useNavigate();

  const [eventData, setEventData] = useState({
    title: '',
    description: '',
    location: '',
    date: '',
    price: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setEventData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const token = localStorage.getItem('token');

      if (!token) {
        setError('You must be logged in as an admin to create events.');
        return;
      }

      const res = await axios.post(
        'http://localhost:5000/api/events',
        eventData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSuccess('Event created successfully!');
      setTimeout(() => navigate('/'), 2000);
    } catch (err) {
      setError(
        err.response?.data?.msg ||
        err.response?.data?.error ||
        'Failed to create event'
      );
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '600px' }}>
      <h3 className="mb-4 text-center">Create New Event</h3>
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group mb-3">
          <label>Title</label>
          <input
            type="text"
            name="title"
            className="form-control"
            value={eventData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group mb-3">
          <label>Description</label>
          <textarea
            name="description"
            className="form-control"
            value={eventData.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <div className="form-group mb-3">
          <label>Location</label>
          <input
            type="text"
            name="location"
            className="form-control"
            value={eventData.location}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group mb-3">
          <label>Date & Time</label>
          <input
            type="datetime-local"
            name="date"
            className="form-control"
            value={eventData.date}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group mb-4">
          <label>Price (₹)</label>
          <input
            type="number"
            name="price"
            className="form-control"
            value={eventData.price}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-success w-100">
          Create Event
        </button>
      </form>
    </div>
  );
};

export default CreateEvent;
