const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('./async');
const jwt = require('jsonwebtoken');
const db = require('../models');

const protect = asyncHandler(async (request, response, next) => {
  let token = null;
  if (request.headers.authorization && request.headers.authorization.startsWith('Bearer')) {
    token = request.headers.authorization.split(' ')[1];
  } else if (request.cookies.token) {
    token = request.cookies.token;
  }

  if (!token) {
    return next(new ErrorResponse('Not authorized to access this route', 401));
  }

  try {
    const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);
    const user = await db.users.findOne({ where: { email: verifiedToken.userId } });
    if (!user) {
      return next(new ErrorResponse('Not authorized to access this route', 401));
    }
    request.user = user;
    next();
  } catch (error) {
    return next(new ErrorResponse('Not authorized to access this route', 401));
  }
});

const authorizeAdmin = asyncHandler(async (request, response, next) => {
  const user = request.user;

  if (!user.isAdmin) {
    return next(new ErrorResponse('Only admins can access this route', 401));
  }

  next();
});

exports.protect = protect;
exports.authorizeAdmin = authorizeAdmin;
