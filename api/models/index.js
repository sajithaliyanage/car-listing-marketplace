const { DataTypes } = require('sequelize');
const { sequelize } = require('../services/pg');

const db = {};

db.users = require('./user')(sequelize, DataTypes);
db.cars = require('./cars')(sequelize, DataTypes);
db.search = require('./search')(sequelize, DataTypes);
db.carBookings = require('./carBooking')(sequelize, DataTypes);

db.search.belongsTo(db.users, {
  foreignKey: 'userId',
  targetKey: 'id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

db.carBookings.belongsTo(db.users, {
  foreignKey: 'userId',
  targetKey: 'id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

db.carBookings.belongsTo(db.cars, {
  foreignKey: 'carId',
  targetKey: 'id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
  as: 'carDetails',
});

db.cars.hasMany(db.carBookings, { foreignKey: 'carId', as: 'bookings' });

module.exports = db;
