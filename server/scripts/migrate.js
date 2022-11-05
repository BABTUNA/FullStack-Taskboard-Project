const fs = require('fs');
const path = require('path');
const { Pool } = require('pg');
const config = require('../src/config');

const pool = new Pool({ connectionString: config.databaseUrl });
const schema = fs.readFileSync(path.join(__dirname, '..', 'db', 'schema.sql'), 'utf8');

pool.query(schema)
  .then(() => console.log('Database schema created'))
  .finally(() => pool.end());
