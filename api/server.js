const cors = require('cors');
const express = require('express');
const colors = require('colors');

colors.enable();

const app = express();

app.use(cors());

const port = process.env.PORT;
const host = process.env.HOST;
app.listen(
  port,
  host,
  console.log(`Server running in ${process.env.NODE_ENV} on http://${host}:${port}`.green)
);
