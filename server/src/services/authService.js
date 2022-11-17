const bcrypt = require('bcryptjs');
const users = require('../repositories/userRepository');

async function register({ name, email, password }) {
  if (!name || !email || !password) throw new Error('Name, email and password are required');
  if (await users.findByEmail(email)) throw new Error('Email is already registered');
  const passwordHash = await bcrypt.hash(password, 10);
  return users.create({ name, email: email.toLowerCase(), passwordHash });
}

module.exports = { register };
