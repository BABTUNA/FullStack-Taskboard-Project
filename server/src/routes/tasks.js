const express = require('express');
const authenticate = require('../middleware/authenticate');
const tasks = require('../repositories/taskRepository');

const router = express.Router();
router.use(authenticate);

router.get('/', async (request, response) => {
  response.json({ tasks: await tasks.list(request.userId) });
});

router.post('/', async (request, response) => {
  if (!request.body.title) return response.status(400).json({ error: 'Title is required' });
  const task = await tasks.create(request.userId, request.body);
  response.status(201).json({ task });
});

module.exports = router;
