const startServer = require('./server');
const db = require('./db');
require('dotenv').config();

const port = process.env.PORT;

db.then(() => startServer(port)).catch(err =>
  console.log(`Server is not running. ${err.message}`),
);
