const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user) return res.status(400).json({ message: 'Invalid username' });
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid password' });
        }

        jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
            if (err) {
                console.log(err)
                return res.status(500).json({ message: 'Token generation failed' });
            }

            res.status(200).json({
                message: 'Login successful',
                token,
                userId : user._id
            });
        });

    } catch (err) {
        console.log(err.message);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
