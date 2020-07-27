const startServer = require('./api/server');
require('dotenv').config();

const port = process.env.PORT;

startServer(port);
