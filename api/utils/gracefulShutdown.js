const { closeDB } = require('../services/pg');

exports.gracefulShutdown = async () => {
  try {
    await closeDB();
    process.exit(0);
  } catch (error) {
    console.info(error.message);
    process.exit(1);
  }
};
