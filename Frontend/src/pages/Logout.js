import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    alert('Logged out successfully!');
    navigate('/');
  }, [navigate]);

  return null; // no UI needed
};

export default Logout;
