const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  role: { type: String, default: 'user' } // 'user' or 'admin'
});

module.exports = mongoose.model('User', userSchema);
