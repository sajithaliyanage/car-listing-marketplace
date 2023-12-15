const jwt = require('jsonwebtoken');
const db = require('../models');
const { getSaltHashPassword } = require('./common');

exports.generateAuthToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

exports.createAdminUser = async () => {
  const saltedPassword = await getSaltHashPassword(process.env.ADMIN_PASSWORD);
  await db.users.findOrCreate({
    where: { email: process.env.ADMIN_EMAIL },
    defaults: {
      username: 'admin',
      email: process.env.ADMIN_EMAIL,
      password: saltedPassword,
      isAdmin: true,
    },
  });
};
