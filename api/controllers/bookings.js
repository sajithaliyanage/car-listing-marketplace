const { randomUUID } = require('crypto');

const asyncHandler = require('../middleware/async');
const db = require('../models');
const ErrorResponse = require('../utils/errorResponse');

const setBooking = asyncHandler(async (request, response, next) => {
  const { carId, date } = request.body;

  if (new Date(date) <= new Date()) {
    return next(new ErrorResponse('Booking date must be greater than today', 400));
  }

  const carBooking = await db.carBookings.findOne({
    where: {
      carId,
      date,
    },
  });
  if (carBooking) {
    return next(new ErrorResponse('Car is already booked on the specified date', 400));
  }

  const referenceNumber = randomUUID();
  await db.carBookings.create({
    userId: request.user.id,
    carId,
    referenceNumber,
    date,
  });

  response.status(200).json({
    success: true,
    data: {
      referenceNumber,
    },
  });
});

const getBooking = asyncHandler(async (request, response, next) => {
  const { referenceNumber } = request.params;

  const carBooking = await db.carBookings.findOne({
    where: { referenceNumber },
    include: [
      {
        model: db.cars,
        attributes: { exclude: ['createdAt', 'updatedAt'] },
        as: 'carDetails',
      },
    ],
    attributes: ['referenceNumber', 'date'],
  });

  response.status(200).json({
    success: true,
    data: carBooking ? carBooking : {},
  });
});

const cancelBooking = asyncHandler(async (request, response, next) => {
  const { referenceNumber } = request.params;

  const carBooking = await db.carBookings.findOne({
    where: { referenceNumber },
  });

  if (!carBooking) {
    return next(new ErrorResponse('Booking not found', 400));
  }

  if (!request.user.isAdmin && carBooking.userId !== request.user.id) {
    return next(
      new ErrorResponse('Provided booking reference does not belongs to the requested user', 400)
    );
  }

  const currentDate = new Date();
  const bookingDate = new Date(carBooking.date);
  const bookingCreatedDate = new Date(carBooking.createdAt);
  const timeDifferenceHours = Math.abs(bookingCreatedDate - currentDate) / 36e5;

  if (timeDifferenceHours < 24) {
    return next(new ErrorResponse('Booking cannot be canceled in the first 24 hours', 400));
  } else if (bookingDate < currentDate) {
    return next(new ErrorResponse('Older booking cannot be canceled', 400));
  }

  await carBooking.destroy();

  response.status(200).json({
    success: true,
    data: {},
  });
});

exports.getBooking = getBooking;
exports.setBooking = setBooking;
exports.cancelBooking = cancelBooking;
