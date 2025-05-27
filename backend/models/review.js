const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  car: { type: String },
  text: { type: String, required: true },
  rating: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Review', ReviewSchema);