const express = require('express');
const router = express.Router();
const User = require('../models/user');

// Sync user from Clerk (create if not exists, update if fields changed)
router.post('/sync', async (req, res) => {
  const { name, email, phone, address } = req.body;

  if (!email) return res.status(400).json({ error: 'Email is required' });

  try {
    let user = await User.findOne({ email });

    if (!user) {
      // Create new user with default information
      const defaultUser = {
        name: name || 'New User',
        email: email,
        phone: phone || '(555) 555-5555',  // Default phone number
        address: address || '123 UCI Drive, Irvine, CA 92697'  // Default address
      };
      
      user = new User(defaultUser);
      await user.save();
      return res.status(201).json({ message: 'User created with default information', user: defaultUser });
    } else {
      // Optional update if info differs
      const updates = {};
      if (name && user.name !== name) updates.name = name;
      if (phone && user.phone !== phone) updates.phone = phone;
      if (address && user.address !== address) updates.address = address;

      if (Object.keys(updates).length > 0) {
        user = await User.findOneAndUpdate({ email }, { $set: updates }, { new: true });
        return res.status(200).json({ message: 'User updated', user });
      } else {
        return res.status(200).json({ message: 'User exists, no changes', user });
      }
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to sync user' });
  }
});

// Get user by email (used in frontend fetch)
router.get('/email/:email', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email });
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});

// Update user by email (used to save edits from profile dashboard)
router.put('/email/:email', async (req, res) => {
  const { phone, address } = req.body;
  try {
    const user = await User.findOneAndUpdate(
      { email: req.params.email },
      { $set: { phone, address } },
      { new: true }
    );
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json({ message: 'User updated', user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update user' });
  }
});

module.exports = router;
