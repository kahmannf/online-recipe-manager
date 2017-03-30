'use strict';
const mysql = require('mysql');
const config = require('../config');

const pool = mysql.createPool(config.mysql);

module.exports = {
    
    /**
    * @function gets objects from the db based on the sql
    * @param {string} sql
    * @callback queryCallback
    */
    executesql: (sql, callback) => {
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
    /**
     * Maskes a string for sql insertion
     * @function
     * @param {string} str
     * @returns {string}
     */
    mask_str: (str) => {
        if(!str || str == null){
            return '';
        }
        else{
            return '\'' + str.replace('\'', '\'\'') + '\'';
        }
    }

    /**
    * This callback handles the end of a Database Query
    * @callback queryCallback
    * @param {IError} err represents a error of a non-sucessful operation
    * @param {any} rows represents the rows of a sucessful operation
    * @param {IFieldInfo[]} fields represents the fileds of the db table
    */
}