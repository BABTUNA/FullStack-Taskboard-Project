const express = require('express');
const auth = require('../services/authService');
const authenticate = require('../middleware/authenticate');
const users = require('../repositories/userRepository');

const router = express.Router();

router.post('/register', async (request, response) => {
  try {
    const user = await auth.register(request.body);
    response.status(201).json({ user });
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
});

router.post('/login', async (request, response) => {
  try {
    response.json(await auth.login(request.body));
  } catch (error) {
    response.status(401).json({ error: error.message });
  }
});

router.get('/me', authenticate, async (request, response) => {
  const user = await users.findById(request.userId);
  if (!user) return response.status(404).json({ error: 'User not found' });
  response.json({ user });
});

module.exports = router;
