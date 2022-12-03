class AppError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

function notFound(request, response) {
  response.status(404).json({ error: 'Route not found' });
}

function handleError(error, request, response, next) {
  if (response.headersSent) return next(error);
  response.status(error.status || 500).json({ error: error.message || 'Unexpected error' });
}

module.exports = { AppError, handleError, notFound };
