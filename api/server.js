const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const app = express();
const router = require('./router');

const errorHandler = (err, req, res, next) => {
  res.status(500).send('Error found: ' + err.stack);
};

const startServer = port => {
  app.use(cors('*'));
  app.use(express.json());
  app.use(morgan('dev'));
  app.use('/api', router);
  app.use(errorHandler);

  app.listen(port);
  console.log('Listening port', port);
};

module.exports = startServer;
