'use strict';
require('dotenv').load();

const server = require('./server');
const session = require('./session');
const mysql = require('./mysql');

module.exports = {
    server: server,
    session: session,
    mysql: mysql,
}