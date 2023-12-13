const jwt = require('jsonwebtoken');
const db = require('../models');
const { getSaltHashPassword } = require('./common');

exports.generateAuthToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

exports.createAdminUser = async () => {
  const saltedPassword = await getSaltHashPassword('Admin@123');
  await db.users.findOrCreate({
    where: { email: 'admin@carmarketplace.com' },
    defaults: {
      username: 'admin',
      email: 'admin@carmarketplace.com',
      password: saltedPassword,
      isAdmin: true,
    },
  });
};
