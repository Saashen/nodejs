const { port } = require('./config');
const startServer = require('./api/server');

startServer(port);
