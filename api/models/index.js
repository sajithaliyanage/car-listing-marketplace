const { DataTypes } = require('sequelize');
const { sequelize } = require('../services/pg');

const db = {};

db.users = require('./user')(sequelize, DataTypes);
db.cars = require('./cars')(sequelize, DataTypes);
db.search = require('./search')(sequelize, DataTypes);

db.search.belongsTo(db.users, {
  foreignKey: 'userId',
  targetKey: 'id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

module.exports = db;
