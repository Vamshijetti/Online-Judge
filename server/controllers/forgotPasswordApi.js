const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/user');

router.put('/forgotPassword', async (req, res) => {
  const { username, newPassword } = req.body;

  try {
    const existingUser = await User.findOne({ username });
    if (!existingUser) {
      return res.status(400).json({ message: 'User does not exist' });
    }

    existingUser.password = newPassword;
    await existingUser.save();

    res.status(200).json({ message: 'Password updated successfully' });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
