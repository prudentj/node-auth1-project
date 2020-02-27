const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const session = require('express-session');
const KnexStore = require('connect-session-knex')(session);
const knex = require('../database/dbConfig');

const apiRouter = require('./api-router');

const server = express();

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
server.use(helmet());
server.use(express.json());
server.use(cors());
server.use(session(sessionConfig));
server.use('/api', apiRouter);

module.exports = server;
