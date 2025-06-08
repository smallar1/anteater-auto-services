const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');

// Add a new booking
router.post('/', async (req, res) => {
  try {
    const booking = new Booking(req.body);
    await booking.save();
    res.status(201).json(booking);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get bookings by user
router.get('/email/:email', async (req, res) => {
  try {
    const bookings = await Booking.find({ userEmail: req.params.email }).sort({ date: -1 });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
});

// Update booking (reschedule)
router.put('/:id', async (req, res) => {
  try {
    const { date, time } = req.body;
    const updated = await Booking.findByIdAndUpdate(
      req.params.id,
      { date, time },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: 'Failed to reschedule' });
  }
});

// DELETE a booking by ID
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Booking.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    res.json({ message: 'Booking cancelled' });
  } catch (err) {
    console.error("Deletion error:", err);
    res.status(500).json({ error: 'Failed to cancel appointment' });
  }
});


module.exports = router;
