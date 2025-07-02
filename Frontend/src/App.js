import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';

import Home from './pages/Home';
import EventList from './pages/EventList';
import CreateEvent from './pages/CreateEvent';
import MyBookings from './pages/MyBookings';
import Register from './pages/Register';
import Login from './pages/Login';
import Logout from './pages/Logout';

function App() {
  return (
    <Router>
      <Navbar /> {/* ✅ Displayed on all pages */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<EventList />} />
        <Route path="/create" element={<CreateEvent />} />
        <Route path="/mybookings" element={<MyBookings />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/mybookings" element={<MyBookings />} />
      </Routes>
    </Router>
  );
}

export default App;
