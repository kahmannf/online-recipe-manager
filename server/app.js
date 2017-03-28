'use strict';
const express = require('express');

const router = require('./router');
const config = require('./config');

const bodyParser = require('body-parser');

const cookieParser = require('cookie-parser');
const session = require('express-session');

const app = express();

app.use('/', (req, res, next) => {
    if (config.server.log_incoming_requests == 1) {
        console.log(`Incomming "${req.method}" on "${req.url}"`);
    }
    next();
});

app.use(express.static('./public'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session(config.session));

app.use('/', router);

module.exports = app;