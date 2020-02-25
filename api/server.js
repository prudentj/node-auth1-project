const express = require('express');
const server = express();

const apiRouter = require('./api-router');
const configMiddleware = require('./configure-middleware');

configMiddleware(server);
server.use('/api', apiRouter);

module.exports = server;
