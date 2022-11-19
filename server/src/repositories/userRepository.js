const db = require('../db');

async function findByEmail(email) {
  const result = await db.query('SELECT * FROM users WHERE email = $1', [email]);
  return result.rows[0];
}

async function findById(id) {
  const result = await db.query('SELECT id, name, email FROM users WHERE id = $1', [id]);
  return result.rows[0];
}

async function create({ name, email, passwordHash }) {
  const result = await db.query(
    'INSERT INTO users (name, email, password_hash) VALUES ($1, $2, $3) RETURNING id, name, email',
    [name, email, passwordHash]
  );
  return result.rows[0];
}

module.exports = { create, findByEmail, findById };
