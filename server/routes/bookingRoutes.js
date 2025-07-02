const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const Event = require('../models/Event');
const jwt = require('jsonwebtoken');

// ✅ Middleware: Authenticate user using JWT
const authenticate = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) return res.status(401).json({ msg: 'No token, access denied' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Contains userId and role
    next();
  } catch (err) {
    res.status(400).json({ msg: 'Invalid token' });
  }
};

// ✅ POST /api/bookings → Book an event
router.post('/', authenticate, async (req, res) => {
  try {
    const { eventId } = req.body;

    // Check if event exists
    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ msg: 'Event not found' });

    // Prevent duplicate booking
    const alreadyBooked = await Booking.findOne({
      user: req.user.userId,
      event: eventId,
    });
    if (alreadyBooked) {
      return res.status(400).json({ msg: 'You have already booked this event' });
    }

    // Create booking
    const booking = new Booking({
      user: req.user.userId,
      event: eventId,
    });

    await booking.save();
    res.status(201).json({ msg: 'Event booked successfully', booking });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ GET /api/bookings/my → Get user's own bookings
router.get('/my', authenticate, async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.userId })
      .populate('event'); // populate 'event', not 'eventId'

    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ DELETE /api/bookings/:id → Cancel a booking by ID
router.delete('/:id', authenticate, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) return res.status(404).json({ msg: 'Booking not found' });

    if (booking.user.toString() !== req.user.userId) {
      return res.status(403).json({ msg: 'Access denied' });
    }

    await booking.deleteOne();
    res.json({ msg: 'Booking cancelled successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;
