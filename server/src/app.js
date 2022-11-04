const cors = require('cors');
const express = require('express');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/health', (request, response) => {
  response.json({ status: 'ok' });
});

module.exports = app;
