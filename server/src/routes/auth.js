const express = require('express');
const auth = require('../services/authService');

const router = express.Router();

router.post('/register', async (request, response) => {
  try {
    const user = await auth.register(request.body);
    response.status(201).json({ user });
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
});

module.exports = router;
