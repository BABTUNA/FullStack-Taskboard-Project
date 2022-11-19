const db = require('../db');

async function list(ownerId) {
  const result = await db.query(
    'SELECT * FROM tasks WHERE owner_id = $1 ORDER BY created_at DESC',
    [ownerId]
  );
  return result.rows;
}

async function create(ownerId, task) {
  const result = await db.query(
    `INSERT INTO tasks (owner_id, title, description, priority, due_date)
     VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    [ownerId, task.title, task.description || '', task.priority || 'normal', task.dueDate || null]
  );
  return result.rows[0];
}

async function update(ownerId, id, changes) {
  const result = await db.query(
    `UPDATE tasks SET title = $1, description = $2, status = $3,
       priority = $4, due_date = $5, updated_at = NOW()
     WHERE id = $6 AND owner_id = $7 RETURNING *`,
    [changes.title, changes.description, changes.status, changes.priority,
      changes.dueDate || null, id, ownerId]
  );
  return result.rows[0];
}

async function remove(ownerId, id) {
  const result = await db.query(
    'DELETE FROM tasks WHERE id = $1 AND owner_id = $2 RETURNING id',
    [id, ownerId]
  );
  return result.rowCount > 0;
}

module.exports = { create, list, remove, update };
