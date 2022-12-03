const express = require('express');
const authenticate = require('../middleware/authenticate');
const tasks = require('../repositories/taskRepository');
const validateTask = require('../middleware/validateTask');

const router = express.Router();
router.use(authenticate);

router.get('/', async (request, response) => {
  const items = await tasks.list(request.userId, request.query);
  response.json({ tasks: items, page: Number(request.query.page) || 1 });
});

router.get('/:id', async (request, response) => {
  const task = await tasks.findOwned(request.userId, request.params.id);
  if (!task) return response.status(404).json({ error: 'Task not found' });
  response.json({ task });
});

router.post('/', validateTask, async (request, response) => {
  const task = await tasks.create(request.userId, request.body);
  response.status(201).json({ task });
});

router.put('/:id', validateTask, async (request, response) => {
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
