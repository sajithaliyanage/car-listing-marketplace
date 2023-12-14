const asyncHandler = require('../middleware/async');
const db = require('../models');
const ErrorResponse = require('../utils/errorResponse');

const getUsers = asyncHandler(async (request, response, next) => {
  const users = await db.users.findAll({
    where: {},
    attributes: ['id', 'username', 'email'],
  });

  response.status(200).json({
    success: true,
    data: users,
  });
});

const markAsAdmin = asyncHandler(async (request, response, next) => {
  const user = await db.users.findByPk(request.params.id);
  if (!user) {
    return next(new ErrorResponse('User not found', 400));
  }

  user.isAdmin = true;
  await user.save();

  response.status(200).json({
    success: true,
    data: {},
  });
});

exports.getUsers = getUsers;
exports.markAsAdmin = markAsAdmin;
