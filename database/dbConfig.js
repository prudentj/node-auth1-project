const knex = require('knex');
const knexfile = require('../knexfile.js');
const env = process.env.NODE_EV || 'development';
module.exports = knex(knexfile[env]);
