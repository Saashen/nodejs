const express = require('express');
const cors = require('cors');

const app = express();
const router = require('./router');

const errorHandler = (err, req, res, next) => {
  res.status(500).send('Error found: ' + err.stack);
};

const startServer = port => {
  app.use(cors('*'));
  app.use(express.json());
  app.use('/', router);
  app.use(errorHandler);

  app.listen(port);
  console.log('Listening port', port);
};

module.exports = startServer;
