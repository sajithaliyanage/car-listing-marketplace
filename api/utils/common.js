const bcrypt = require('bcryptjs');

exports.getSaltHashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const saltedPassword = await bcrypt.hash(password, salt);
  return saltedPassword;
};
