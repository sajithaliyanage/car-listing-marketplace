const { Op } = require('sequelize');

const asyncHandler = require('../middleware/async');
const db = require('../models');
const ErrorResponse = require('../utils/errorResponse');
const {
  stripIllegalCharacters,
  isValidQuery,
  validSearchFields,
  validFilterFields,
  validQueryFields,
  setPagination,
} = require('../utils/common');

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
  const { search, filter } = request.query;
  if (
    !isValidQuery(request.query, validQueryFields) ||
    !isValidQuery(search, validSearchFields) ||
    !isValidQuery(filter, validFilterFields)
  ) {
    const validParameterFormat = `search[${validSearchFields.join(
      ']=<value> | search['
    )}]=<value> | filter[${validFilterFields.join(
      ']=<value> | filter['
    )}]=<value> | page=<> | limit=<>`;
    return next(
      new ErrorResponse(
        `Invalid query parameter provided. Valid parameters are: ${validParameterFormat}`,
        400
      )
    );
  }

  db.search.create({
    userId: request.user.id,
    search: JSON.stringify(search),
    filter: JSON.stringify(filter),
  });

  let findQuery = [];
  if (search) {
    if (search.brand) {
      findQuery.push({
        brand: { [Op.iLike]: stripIllegalCharacters(search.brand) },
      });
    }
    if (search.model) {
      findQuery.push({
        model: { [Op.iLike]: stripIllegalCharacters(search.model) },
      });
    }
  }

  if (filter) {
    if (filter.color) {
      findQuery.push({
        color: { [Op.iLike]: stripIllegalCharacters(filter.color) },
      });
    }
    if (filter.minPrice) {
      findQuery.push({
        price: { [Op.gte]: parseFloat(filter.minPrice) },
      });
    }
    if (filter.maxPrice) {
      findQuery.push({
        price: { [Op.lte]: parseFloat(filter.maxPrice) },
      });
    }
    if (filter.year) {
      findQuery.push({
        year: parseInt(filter.year),
      });
    }
    if (filter.minYear) {
      findQuery.push({
        year: { [Op.gte]: parseInt(filter.minYear) },
      });
    }
    if (filter.maxYear) {
      findQuery.push({
        year: { [Op.lte]: parseInt(filter.maxYear) },
      });
    }
    if (filter.minMileage) {
      findQuery.push({
        mileage: { [Op.gte]: parseInt(filter.minMileage) },
      });
    }
    if (filter.maxMileage) {
      findQuery.push({
        mileage: { [Op.lte]: parseInt(filter.maxMileage) },
      });
    }
  }

  let page = parseInt(request.query.page) || 1;
  let limit = parseInt(request.query.limit) || 5;
  let offset = page === 1 ? 0 : (page - 1) * limit;

  const { count, rows: paginatedCars } = await db.cars.findAndCountAll({
    where: { [Op.and]: findQuery },
    limit,
    offset,
    order: [['id', 'ASC']],
    attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] },
  });

  const pagination = setPagination(count, page, limit);
  response.status(200).json({
    success: true,
    count,
    pagination: Object.keys(pagination).length > 0 ? pagination : undefined,
    data: paginatedCars,
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
