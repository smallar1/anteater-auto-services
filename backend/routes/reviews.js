const express = require('express');
const router = express.Router();
const Review = require('../models/Review');

// Create a review
router.post('/', async (req, res) => {
  const { userId, name, car, text, rating } = req.body; // <-- add name and car here
  try {
    const review = new Review({ userId, name, car, text, rating });
    await review.save();
    res.status(201).json(review);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all reviews
router.get('/', async (req, res) => {
  const reviews = await Review.find();
  res.json(reviews);
});

module.exports = router;