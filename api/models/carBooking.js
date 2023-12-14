const db = require('.');

module.exports = (sequelize, DataTypes) => {
  const CarBookings = sequelize.define(
    'car_bookings',
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: db.users,
          key: 'id',
        },
      },
      carId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: db.carId,
          key: 'id',
        },
      },
      referenceNumber: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      date: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isDate: { msg: 'Invalid date format. Use yyyy-mm-dd.' },
        },
      },
    },
    {
      indexes: [
        {
          fields: ['userId', 'carId'],
        },
        {
          fields: ['referenceNumber'],
        },
      ],
    }
  );

  return CarBookings;
};
