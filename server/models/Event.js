const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: String,
  description: String,
  location: String,
  date: Date,
  price: Number,
  createdBy: String
});

module.exports = mongoose.model('Event', eventSchema);
