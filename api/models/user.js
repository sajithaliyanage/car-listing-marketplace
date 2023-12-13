module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'users',
    {
      username: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
      },
      isAdmin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      indexes: [
        {
          fields: ['email'],
        },
      ],
    }
  );

  return User;
};
