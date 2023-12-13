const cors = require('cors');
const colors = require('colors');
const express = require('express');
const helmet = require('helmet');
const hpp = require('hpp');
const morgan = require('morgan');
const xss = require('xss-clean');
const { connectDB, sequelize } = require('./services/pg');
const { gracefulShutdown } = require('./utils/gracefulShutdown');
const db = require('./models/index');

const runWorker = () => {
  const app = express();

  app.disable('x-powered-by');
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(helmet());
  app.use(hpp());
  app.use(xss());

  if (process.env.NODE_ENV === 'production') {
    app.use(morgan('combined'));
  } else {
    console.log('Morgan logger set to developement mode'.yellow);
    app.use(morgan('dev'));
  }

  const port = process.env.PORT;
  const host = process.env.HOST;
  app.listen(
    port,
    host,
    console.log(`Server running in ${process.env.NODE_ENV} on http://${host}:${port}`.green)
  );
};

process.on('unhandledRejection', async (error) => {
  console.log(`Error: ${error.message}`.red);
  console.log(error.stack);
  await gracefulShutdown();
});

process.on('SIGINT', async () => {
  console.log(`Got SIGINT signal. Graceful shutdown starts`.green);
  await gracefulShutdown();
});

const initServer = async () => {
  try {
    colors.enable();
    await connectDB();

    runWorker();
  } catch (error) {
    console.error(`${error.message}`.red);
    console.error(error.stack);
  }
};

initServer();
