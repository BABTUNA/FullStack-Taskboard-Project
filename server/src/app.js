const cors = require('cors');
const express = require('express');
const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/tasks');
const { handleError, notFound } = require('./middleware/errors');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

app.get('/health', (request, response) => {
  response.json({ status: 'ok' });
});

app.use(notFound);
app.use(handleError);

module.exports = app;
