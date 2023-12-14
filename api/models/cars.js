const { stringRegex } = require('../utils/common');

module.exports = (sequelize, DataTypes) => {
  const Car = sequelize.define(
    'cars',
    {
      vin: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      brand: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: true,
        },
      },
      model: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: true,
        },
      },
      color: {
        type: DataTypes.STRING,
      },
      year: {
        type: DataTypes.INTEGER,
        validate: {
          isInt: true,
        },
      },
      mileage: {
        type: DataTypes.DOUBLE,
        validate: {
          isNumeric: true,
        },
      },
      price: {
        type: DataTypes.DOUBLE,
        validate: {
          isNumeric: true,
        },
      },
    },
    {
      indexes: [
        {
          unique: true,
          fields: ['vin'],
        },
        {
          unique: false,
          fields: ['brand'],
        },
        {
          unique: false,
          fields: ['model'],
        },
        {
          unique: false,
          fields: ['year'],
        },
        {
          unique: false,
          fields: ['color'],
        },
        {
          unique: false,
          fields: ['price'],
        },
        {
          unique: false,
          fields: ['mileage'],
        },
      ],
    }
  );

  return Car;
};
