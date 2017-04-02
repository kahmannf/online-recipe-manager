'use strict';
require('dotenv').load();

const server = require('./server');
const session = require('./session');
const mysql = require('./mysql');
const email = require('./email');

module.exports = {
    email: email,
    server: server,
    session: session,
    mysql: mysql,
}