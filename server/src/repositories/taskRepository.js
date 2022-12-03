const db = require('../db');

async function list(ownerId, filters = {}) {
  const page = Math.max(Number(filters.page) || 1, 1);
  const limit = Math.min(Math.max(Number(filters.limit) || 20, 1), 100);
  const values = [ownerId];
  const where = ['owner_id = $1'];
  if (filters.status) {
    values.push(filters.status);
    where.push(`status = $${values.length}`);
  }
  if (filters.search) {
    values.push(`%${filters.search}%`);
    where.push(`title ILIKE $${values.length}`);
  }
  values.push(limit, (page - 1) * limit);
  const result = await db.query(
    `SELECT * FROM tasks WHERE ${where.join(' AND ')}
     ORDER BY created_at DESC LIMIT $${values.length - 1} OFFSET $${values.length}`,
    values
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

async function findOwned(ownerId, id) {
  const result = await db.query(
    'SELECT * FROM tasks WHERE id = $1 AND owner_id = $2',
    [id, ownerId]
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

module.exports = { create, findOwned, list, remove, update };
