const { generateAuthToken } = require('./token');

const sendTokenResponse = (userId, statusCode, response) => {
  const token = generateAuthToken(userId);

  const options = {
    expires: new Date(Date.now() + parseInt(259200000, 10)),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === 'production') {
    options.secure = true;
  }

  response.status(statusCode).cookie('token', token, options).json({
    success: true,
    token,
  });
};

module.exports = sendTokenResponse;
