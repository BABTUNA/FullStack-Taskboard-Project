const jwt = require('jsonwebtoken');
const config = require('../config');

module.exports = function authenticate(request, response, next) {
  const token = request.headers.authorization?.replace(/^Bearer /, '');
  if (!token) return response.status(401).json({ error: 'Authentication required' });

  try {
    request.userId = Number(jwt.verify(token, config.jwtSecret).sub);
    next();
  } catch (error) {
    response.status(401).json({ error: 'Invalid or expired token' });
  }
};
