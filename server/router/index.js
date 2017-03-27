const express = require('express');
const router = express.Router();

const user = require('./user');
//const data = require('./data');

router.use('/user', user)
//router.use('/data', data);

router.get('/hack', (req, res) => {
    var sql = 'alter table users change password salt varchar(400)';
    var db = require('../db');

    db.executesql(sql, res);
});

router.get('/', (req, res) => { res.status(404).send('Nothing here to see...') });

module.exports = router;