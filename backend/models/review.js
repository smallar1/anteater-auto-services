const mongoose = require('mongoose');

// Define the Review schema, tells Mongoose how to structure the review documents
// Enforces required fields and their types

const ReviewSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  car: { type: String },
  text: { type: String, required: true },
  rating: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Review', ReviewSchema);