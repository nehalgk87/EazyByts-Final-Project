import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('token');
  const role = localStorage.getItem('role');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    alert('Logged out!');
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
      <Link className="navbar-brand" to="/">EventMgmt</Link>

      <div className="collapse navbar-collapse">
        <ul className="navbar-nav ms-auto">

          <li className="nav-item">
            <Link className="nav-link" to="/events">Events</Link>
          </li>

          {isLoggedIn && (
            <li className="nav-item">
              <Link className="nav-link" to="/mybookings">My Bookings</Link>
            </li>
          )}

          {isLoggedIn && role === 'admin' && (
            <li className="nav-item">
              <Link className="nav-link" to="/create">Create Event</Link>
            </li>
          )}

          {!isLoggedIn ? (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/register">Register</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/login">Login</Link>
              </li>
            </>
          ) : (
            <li className="nav-item">
              <button className="btn btn-outline-danger ms-2" onClick={handleLogout}>
                Logout
              </button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
