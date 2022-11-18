const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config');
const users = require('../repositories/userRepository');

async function register({ name, email, password }) {
  if (!name || !email || !password) throw new Error('Name, email and password are required');
  if (await users.findByEmail(email)) throw new Error('Email is already registered');
  const passwordHash = await bcrypt.hash(password, 10);
  return users.create({ name, email: email.toLowerCase(), passwordHash });
}

async function login({ email, password }) {
  const user = await users.findByEmail(email.toLowerCase());
  if (!user || !(await bcrypt.compare(password, user.password_hash))) {
    throw new Error('Invalid email or password');
  }
  const token = jwt.sign({ sub: user.id }, config.jwtSecret, { expiresIn: '8h' });
  return { token, user: { id: user.id, name: user.name, email: user.email } };
}

module.exports = { login, register };
