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

router.put('/:id', async (request, response) => {
  const task = await tasks.update(request.userId, request.params.id, request.body);
  if (!task) return response.status(404).json({ error: 'Task not found' });
  response.json({ task });
});

router.delete('/:id', async (request, response) => {
  const removed = await tasks.remove(request.userId, request.params.id);
  if (!removed) return response.status(404).json({ error: 'Task not found' });
  response.status(204).end();
});

module.exports = router;
