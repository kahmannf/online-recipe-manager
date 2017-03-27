const mysql = require('mysql');

const express = require('express');
const router = express.Router();

const config = require('../../config');

const db = require('../../db');
const security = require('../../security');


router.get('/mock', (req, res) => {

});

router.get('/all', (req, res) => {
    var sql = 'select username, guid from users';
    db.getitems(sql, (err, rows, fields) => {
        if (err)
        {
            db.handleDBerror(err, res)
            return;
        }

        res.json(rows);
    });
});

//
//Returncodes:
//
//  0       Sucessful Login
//
//  1       Invalid email/password combination
//  2       User not Registered
//
//  3       Invalid Data
//
router.post('/login', (req, res) => {
    var sql = 'select * from users where email like \'' + req.query.email + '\'';
    db.getitems(sql, (err, rows, fields) => {
        if (err) {
            db.handleDBerror(err, res);
            return;
        }

        if (rows.length && rows.length == 1) {

            if (!rows[0].salt || !rows[0].hash) { //User-registration not complete
                if (rows[0].register_key) {
                    res.status(200).send('2');
                }
                else {
                    res.status(200).send('3');
                }
                return;
            }

            if (security.comparepassword(req.query.password, rows[0].salt, rows[0].hash)) {

                req.session.loggedinuser = rows[0].guid;
            
                res.status(200).send('0');
            }
            else { //Invalid password
                res.status(200).send('1');
            }
        }
        else {
            res.status(200).send('1');
        }
    });
});

module.exports = router;