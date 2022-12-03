module.exports = function validateTask(request, response, next) {
  const { title, status, priority } = request.body;
  if (!title || !title.trim()) return response.status(400).json({ error: 'Title is required' });
  if (status && !['todo', 'doing', 'done'].includes(status)) {
    return response.status(400).json({ error: 'Unknown task status' });
  }
  if (priority && !['low', 'normal', 'high'].includes(priority)) {
    return response.status(400).json({ error: 'Unknown task priority' });
  }
  next();
};
