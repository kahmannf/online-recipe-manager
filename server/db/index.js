const mysql = require('mysql');
const config = require('../config');

const pool = mysql.createPool(config.mysql);

module.exports = {
    /*
    * @param {string} sql
    * @param {function(err, result, fields)} callback
    */
    getitems: (sql, callback) => {
        pool.getConnection((err, connection) => {
            if (err)
            {
                callback(err, undefined, undefined);
                return;
            }

            connection.query(sql, (err, rows, fields) => {
                connection.release();

                callback(err, rows, fields);
                return;
            });
        });
    },
    handleDBerror: (err, res) => {
        if (config.server.loglevel > 999) {
            console.log(err);
        }

        if (config.server.client_error_notification == 1) {
            res.status(500).send(err);
        }
        else {
            res.status(500).send('Error');
        }
    },
    executesql: (sql, res) => {
        pool.getConnection((err, connection) => {
            if (err) {
                handleDBerror(err, res);
                return;
            }

            connection.query(sql, (err, rows, fields) => {
                connection.release();

                res.json({ rows, fields });
                return;
            });
        });
    }
}