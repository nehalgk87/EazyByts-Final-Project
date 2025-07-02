const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/events', require('./routes/eventRoutes'));
app.use('/api/bookings', require('./routes/bookingRoutes'));

app.listen(process.env.PORT, () => console.log(`Server on ${process.env.PORT}`));
