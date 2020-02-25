const express = require('express');
const server = express();

const apiRouter = require('./api-router');
const configMiddleware = require('./configure-middleware');
const session = require('express-session');
const KnexStore = require('connect-session-knex');
const knex = require('../database/dbConfig');
const sessionConfig = {
	name: 'bloodstones', //sid
	secret: 'keep it secret, keep it safe!',
	cookie: {
		maxAge: 1000 * 30,
		secure: false, //true in production
		httpOnly: true
	},
	resave: false,
	saveUninitialized: true, //Need to be for production dynamic because of EU
	store: new KnexStore({
		knex,
		tablename: 'sessions',
		createtable: true,
		sidfieldname: 'sid',
		clearInterval: 1000 * 60 * 15
	})
};
configMiddleware(server);
server.use(session(sessionConfig));
server.use('/api', apiRouter);

module.exports = server;
