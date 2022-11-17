const cors = require('cors');
const express = require('express');
const authRoutes = require('./routes/auth');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);

app.get('/health', (request, response) => {
  response.json({ status: 'ok' });
});

module.exports = app;
