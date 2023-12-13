const Sequelize = require('sequelize');

const sequelize = new Sequelize({
  host: process.env.PG_HOST,
  port: process.env.PG_PORT,
  database: process.env.PG_DATABASE,
  username: process.env.PG_USERNAME,
  password: process.env.PG_PASSWORD,
  dialect: 'postgres',
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  logging: (msg) =>
    process.env.NODE_ENV === 'development' ? console.log(`${msg}`.blue) : undefined,
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log(
      `Server connected to postgressdb on ${process.env.PG_HOST}:${process.env.PG_PORT}`.green
    );
  } catch (error) {
    console.error(`Unable to connect to the database:  ${error.message}`.red);
  }
};

const closeDB = async () => {
  try {
    await sequelize.close();
    console.log(`PostgresDB connections were closed`.green);
  } catch (error) {
    console.log(`Error while closing database connections. Error: ${error.message}`.red);
  }
};

module.exports = { connectDB, closeDB, sequelize };
