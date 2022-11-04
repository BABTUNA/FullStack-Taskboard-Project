const app = require('./app');
const config = require('./config');

app.listen(config.port, () => {
  console.log(`Task board API listening on port ${config.port}`);
});
