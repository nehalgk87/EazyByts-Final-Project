// client/src/pages/Home.js
import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const isAdmin = localStorage.getItem('role') === 'admin';

  return (
    <div className="container mt-5 text-center">
      <h1 className="mb-4">Welcome to Event Management System</h1>

      <div className="d-grid gap-3 col-6 mx-auto">
        <Link to="/events" className="btn btn-primary">View Events</Link>

        {isAdmin && (
          <Link to="/create" className="btn btn-success">Create Event</Link>
        )}

        <Link to="/mybookings" className="btn btn-info">My Bookings</Link>
      </div>
    </div>
  );
};

export default Home;
