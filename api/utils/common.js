const bcrypt = require('bcryptjs');

exports.validQueryFields = ['search', 'filter', 'page', 'limit'];
exports.validSearchFields = ['model', 'brand'];
exports.validFilterFields = [
  'minPrice',
  'maxPrice',
  'minYear',
  'maxYear',
  'minMileage',
  'maxMileage',
  'color',
  'year',
];

exports.getSaltHashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const saltedPassword = await bcrypt.hash(password, salt);
  return saltedPassword;
};

exports.stripIllegalCharacters = (value) => {
  return value
    .replace(/([^a-zA-Z0-9,.:\-_/@ ]+)/g, '')
    .replace(/\s+/g, ' ')
    .trim();
};

exports.isValidQuery = (query, fields) => {
  if (!query) {
    return true;
  }
  return Object.keys(query).every((key) => fields.includes(key));
};

exports.setPagination = (count, page, limit) => {
  let pagination = {};
  if (count > page * limit) {
    pagination.next = {
      page: page + 1,
      limit,
    };
  }

  if (page > 1) {
    pagination.prev = {
      page: page - 1,
      limit,
    };
  }

  return pagination;
};
