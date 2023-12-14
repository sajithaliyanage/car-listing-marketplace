const db = require('.');

module.exports = (sequelize, DataTypes) => {
  const Search = sequelize.define('search', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: db.users,
        key: 'id',
      },
    },
    search: {
      type: DataTypes.STRING,
    },
    filter: {
      type: DataTypes.STRING,
    },
  });

  return Search;
};
