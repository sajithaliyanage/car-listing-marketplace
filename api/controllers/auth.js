const bcrypt = require('bcryptjs');
const asyncHandler = require('../middleware/async');
const db = require('../models');
const ErrorResponse = require('../utils/errorResponse');
const sendTokenResponse = require('../utils/sendTokenResponse');
const { getSaltHashPassword } = require('../utils/common');

const signin = asyncHandler(async (request, response, next) => {
  const { email, password } = request.body;
  if (!email || !password) {
    return next(new ErrorResponse('Please provide login credentials', 400));
  }

  const user = await db.users.findOne({
    where: { email },
    attributes: ['id', 'password'],
  });

  if (!user) {
    return next(new ErrorResponse('Invalid credentials', 401));
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return next(new ErrorResponse('Invalid credentials', 401));
  }

  sendTokenResponse(user.id, 200, response);
});

const signup = asyncHandler(async (request, response, next) => {
  const { username, email, password } = request.body;

  let user = await db.users.findOne({ where: { email } });
  if (user) {
    return next(new ErrorResponse('User account already exists', 400));
  } else {
    const saltedPassword = await getSaltHashPassword(password);
    user = await db.users.create({
      username: username,
      email,
      password: saltedPassword,
    });
  }

  sendTokenResponse(user.id, 200, response);
});

const signout = asyncHandler(async (request, response) => {
  response.cookie('token', 'none', {
    expires: new Date(Date.now() + parseInt(10000, 10)),
    httpOnly: true,
  });

  response.status(200).json({
    success: true,
    data: {},
  });
});

exports.signin = signin;
exports.signup = signup;
exports.signout = signout;
