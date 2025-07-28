// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const User = require('../models/user');
// const { models } = require('mongoose');

// // Register Controller
// async function registerUser(req, res) {
//     const { username, password } = req.body;

//     try {
//         // Check if user exists
//         const existingUser = await User.findOne({ username });
//         if (existingUser) {
//             return res.status(400).json({ message: 'User already exists' });
//         }

//         // Hash password
//         const hashedPassword = await bcrypt.hash(password, 10);

//         // Create and save user
//         const newUser = new User({ username, password: hashedPassword });
//         await newUser.save();

//         res.status(201).json({ message: 'User registered successfully' });
//     } catch (error) {
//         console.error('Register Error:', error.message);
//         res.status(500).json({ message: 'Server error during registration' });
//     }
// }

// // Login Controller
// const loginUser = async (req, res) => {
//   const { username, password } = req.body;

//   try {
//     // Find user
//     const user = await User.findOne({ username });
//     if (!user) {
//       return res.status(400).json({ message: 'Invalid username' });
//     }

//     // Compare password
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(401).json({ message: 'Invalid password' });
//     }

//     // Generate JWT token
//     const token = jwt.sign(
//       { id: user._id, username: user.username },
//       process.env.JWT_SECRET,
//       { expiresIn: '1h' }
//     );

//     res.json({ message: 'Login successful', token, username: user.username });
//   } catch (error) {
//     console.error('Login Error:', error.message);
//     res.status(500).json({ message: 'Server error during login' });
//   }
// };

// module.exports = { registerUser, loginUser };
