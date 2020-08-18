const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');

const apiRouter = require('./routes/contacts');
const authRouter = require('./routes/auth');
const userRouter = require('./routes/users');

const errorHandler = (err, req, res, next) =>
  res.status(500).send({ message: err.message });

const startServer = port => {
  app.use(cors('*'));
  app.use(express.json({ limit: '25kb' }));
  app.use(morgan('dev'));
  app.use(express.static(path.join(__dirname, '..', 'public')));
  require('./config/passport');
  app.use('/users', userRouter);
  app.use('/auth', authRouter);
  app.use('/api', apiRouter);
  app.use(errorHandler);

  app.listen(port);
  console.log('Listening port', port);
};

module.exports = startServer;
