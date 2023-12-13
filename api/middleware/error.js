const ErrorResponse = require('../utils/errorResponse');

const errorHandler = (error, request, response, next) => {
  let errorResponse = { ...error };
  errorResponse.message = error.message;
  console.log(`${error.stack}`.red);

  // Bad ObjectId
  if (error.name === 'CastError') {
    const message = 'The requested resource was not found';
    errorResponse = new ErrorResponse(message, 404);
  }

  // Validation error
  if (error.name === 'ValidationError') {
    const message = Object.values(error.errors).map((error) => error.message);
    errorResponse = new ErrorResponse(message, 400);
  }

  response.status(errorResponse.statusCode || 500).json({
    success: false,
    error: errorResponse.message || 'Server Error',
  });
};

module.exports = errorHandler;
