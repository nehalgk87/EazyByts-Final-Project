import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await axios.post('http://localhost:5000/api/users/login', formData);
      
      // Save token to localStorage
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('role', res.data.user.role);
      localStorage.setItem('user', JSON.stringify(res.data.user));

      alert('Login successful');
      navigate('/'); // redirect to homepage
    } catch (err) {
      setError(err.response?.data?.msg || 'Login failed');
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '400px' }}>
      <h3 className="mb-4 text-center">Login</h3>
      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group mb-3">
          <label>Email</label>
          <input 
            type="email"
            name="email"
            className="form-control"
            value={formData.email}
            onChange={handleChange}
            required 
          />
        </div>

        <div className="form-group mb-3">
          <label>Password</label>
          <input 
            type="password"
            name="password"
            className="form-control"
            value={formData.password}
            onChange={handleChange}
            required 
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">Login</button>
      </form>
    </div>
  );
};

export default Login;
