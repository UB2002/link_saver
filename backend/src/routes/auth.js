import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../model/users.js';

const router = express.Router();

// Sign‑up
router.post('/signup', async (req, res) => {
  const { email, password } = req.body;
  try {
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password: hash });
    res.status(201).json({ id: user._id });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: 'Email already in use' });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(401).json({ error: 'Invalid credentials' });

  const token = jwt.sign({ uid: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
  res.cookie('token', token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      sameSite: 'none',
      secure: true
    })
    .status(200)
    .json({ message: 'Logged in' });
});

// Logout
router.post('/logout', (_req, res) => {
  res.clearCookie('token').json({ message: 'Logged out' });
});

export default router;
