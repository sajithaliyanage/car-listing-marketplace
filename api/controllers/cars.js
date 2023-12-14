const asyncHandler = require('../middleware/async');
const db = require('../models');
const ErrorResponse = require('../utils/errorResponse');

const addCars = asyncHandler(async (request, response, next) => {
  const { cars } = request.body;
  if (!cars) {
    return next(new ErrorResponse('Please provide cars array', 400));
  }

  try {
    await db.cars.bulkCreate(cars);
  } catch (error) {
    if (error?.errors && error?.errors.length > 0) {
      return next(new ErrorResponse(error.errors[0].message, 400));
    } else {
      throw error;
    }
  }

  response.status(200).json({
    success: true,
    data: {},
  });
});

const getCars = asyncHandler(async (request, response, next) => {
  const { query, filter } = request.query;

  const cars = await db.cars.findAll({
    where: {},
    attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] },
  });

  response.status(200).json({
    success: true,
    data: cars,
  });
});

const getCar = asyncHandler(async (request, response, next) => {
  let car = await db.cars.findByPk(request.params.id);

  response.status(200).json({
    success: true,
    data: car ? car : {},
  });
});

exports.addCars = addCars;
exports.getCars = getCars;
exports.getCar = getCar;
