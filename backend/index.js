const express = require('express');
const cors = require('cors');
const { ClerkExpressWithAuth } = require('@clerk/clerk-sdk-node');

const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

const app = express();
app.use(cors());
app.use(express.json());

const reviewsRouter = require('./routes/reviews');
app.use('/api/reviews', reviewsRouter);

// 🔐 Clerk middleware to protect routes
app.use(ClerkExpressWithAuth({}));

// ✅ Protected test route
app.get('/api/profile', (req, res) => {
  const { userId, sessionId, user } = req.auth;

  if (!userId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  res.json({ userId, sessionId, user });
});

app.listen(5050, () => {
  console.log('✅ Backend server running at http://localhost:5050');
});
