const cors = require('cors');
const colors = require('colors');
const express = require('express');
const helmet = require('helmet');
const hpp = require('hpp');
const morgan = require('morgan');
const xss = require('xss-clean');

colors.enable();

const app = express();

app.use(cors());
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
