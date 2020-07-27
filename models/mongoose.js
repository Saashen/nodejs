require('dotenv').config();
const mongoose = require('mongoose');
const dbUri = process.env.DB_URI;

mongoose.connect(dbUri, {
  promiseLibrary: global.Promise,
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

mongoose.connection.on('connected', () =>
  console.log('Database connection successful'),
);

mongoose.connection.on('error', err => {
  console.log(`Database connection error: ${err.message}`);
  process.exit(1);
});

mongoose.connection.on('disconnected', () => console.log('Database disconnected'))
