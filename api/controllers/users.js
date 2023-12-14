const asyncHandler = require('../middleware/async');
const db = require('../models');
const { setPagination } = require('../utils/common');
const ErrorResponse = require('../utils/errorResponse');

const getUsers = asyncHandler(async (request, response, next) => {
  let page = parseInt(request.query.page) || 1;
  let limit = parseInt(request.query.limit) || 5;
  let offset = page === 1 ? 0 : (page - 1) * limit;

  const { count, rows: paginatedUsers } = await db.users.findAndCountAll({
    where: {},
    limit,
    offset,
    order: [['id', 'ASC']],
    attributes: ['id', 'username', 'email'],
  });

  const pagination = setPagination(count, page, limit);
  response.status(200).json({
    success: true,
    count,
    pagination: Object.keys(pagination).length > 0 ? pagination : undefined,
    data: paginatedUsers,
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
