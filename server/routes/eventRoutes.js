const express = require('express');
const router = express.Router();
const Event = require('../models/Event');
const jwt = require('jsonwebtoken');

// Middleware to verify JWT
const authenticate = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) return res.status(401).json({ msg: 'No token, access denied' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // userId, role
    next();
  } catch (err) {
    res.status(400).json({ msg: 'Invalid token' });
  }
};

// @route   POST /api/events
// @desc    Create a new event (admin only)
// @access  Private (admin)
router.post('/', authenticate, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ msg: 'Access denied. Admins only.' });
    }

    const { title, description, location, date, price } = req.body;
    const event = new Event({
      title,
      description,
      location,
      date,
      price,
      createdBy: req.user.userId,
    });

    await event.save();
    res.status(201).json({ msg: 'Event created successfully', event });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// @route   GET /api/events
// @desc    Get all events
// @access  Public
router.get('/', async (req, res) => {
  try {
    const events = await Event.find().sort({ date: 1 });
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
