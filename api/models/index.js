const { DataTypes } = require('sequelize');
const { sequelize } = require('../services/pg');

const db = {};

db.users = require('./user')(sequelize, DataTypes);
db.cars = require('./cars')(sequelize, DataTypes);

module.exports = db;
