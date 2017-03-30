'use strict';
const uuid = require('uuid/v4');
const db = require('../db');
const config = require('../config');

/**
 * @constructor Creates a new user with a new guid.
 */
function user()
{
    /** @member {string} */
    this.email = null;
    /** @member {string} */
    this.guid = uuid();
    /** @member {string} */
    this.hash = null;
    /** @member {string} */
    this.salt = null;
    /** @member {Date} */
    this.creation_date = new Date();
    /** @member {string} */
    this.registerkey = null;
    /** @member {string} */
    this.alias = null;
}

/**
* Creates a new user with a new guid. Also sets a reigster key
* @constructor 
* @param {string} email the users email
* @param {string} alias the users alias/username
*/
user.prototype.generate_registerkey = function() {
    this.registerkey = uuid();
}

/**
* inserts the user as a new user into the db
* @function
* @param {user} user to insert. guid has to be filled
* @callback dbTransaction callback after execution
*/
user.prototype.insert_new = function (callback) {
    try {
        if (!this) {
            throw 'user was undefined or null';
        }

        if (!this.guid) {
            throw 'user.guid was undefined or null';
        }
        var empty = '';
        var sql = `insert into users(email, guid, registerkey, alias) values (\'${this.email || empty}\', \'${this.guid}\',\'${this.registerkey || empty}\',\'${this.alias || empty}\')`;

        //Todo check if username / email exists

        db.executesql(sql, (err, rows, fields) => {
            if (err) {
                callback(err, 1, undefined);
                return;
            }
            console.log(rows);

            //todo call callback with real value
            callback(undefined, 0, this);
            return;
        });
    }
    catch (e) {
        callback(e, 1, udefined);
        return;
    }
}

/**
* refreshes the userdata based on the guid. callback user is same refrence
* @function
* @callback dbTransaction
*/
user.prototype.load = function (callback) {
    try {
        if (!this.guid) {
            throw 'guid was undefined or null';
        }

        db.executesql(`select * from users where guid = \'${this.guid}\'`, (err, rows, fields) => {
            if (err) {
                callback(err, 1, undefined);
                return;
            }
            if (!rows || !rows.length || rows.length != 1) {
                callback('wasnt able to retrieve unique result', 1, undefined);
                return;
            }

            this.email = rows[0].email;
            this.creation_date = rows[0].creation_date;
            this.registerkey = rows[0].registerkey;
            this.alias = rows[0].alias;

            callback(undefined, 0, this);
            return;

        });

    } catch (e) {
        callback(e, 1, undefined);
        return;
    }
}

/**
* !!WARNING: RETRIEVES HASH AND SALT!! refreshes the userdata based on the guid. callback user is new refrence
* @function
* @callback dbTransaction
*/
user.prototype.getfull = function (callback) {
    try {
        if (!this.guid) {
            throw 'guid was undefined or null';
        }

        db.executesql(`select * from users where guid = \'${this.guid}\'`, (err, rows, fields) => {
            if (err) {
                callback(err, 1, undefined);
                return;
            }
            if (!rows || !rows.length || rows.length != 1) {
                callback('wasnt able to retrieve unique result', 1, undefined);
                return;
            }

            var newuser = new user();
            
            newuser.email = rows[0].email;
            newuser.guid = rows[0].guid;
            newuser.hash = rows[0].hash;
            newuser.salt = rows[0].salt;
            newuser.creation_date = rows[0].creation_date;
            newuser.registerkey = rows[0].registerkey;
            newuser.alias = rows[0].alias;

            callback(undefined, 0, newuser);
            return;

        });

    } catch (e) {
        callback(e, 1, undefined);
        return;
    }
}

/**
* updates the save userproperties (email, alias, registerkey) based on the guid
* @function
* @callback dbTransaction
*/
user.prototype.updatesaveinfo = function (callback) {
    try {
        if (!this) {
            throw 'user was undefined or null';
        }

        if (!this.guid) {
            throw 'user.guid was undefined or null';
        }
        var empty = '';
        var sql = `update users set `
            + ` email = ${db.mask_str(this.email)},`
            + ` registerkey = ${db.mask_str(this.registerkey)},` 
            + ` alias = ${db.mask_str(this.alias)}`
            + ` where guid = ${db.mask_str(this.guid)}`;
        
        db.executesql(sql, (err, rows, fields) => {
            if (err) {
                callback(err, 1, undefined);
                return;
            }
            
            callback(undefined, 0, this);
            return;
        });
    }
    catch (e) {
        callback(e, 1, udefined);
        return;
    }
}

/**
* updates all userproperties based on the guid
* @function
* @callback dbTransaction
*/
user.prototype.updateall = function (callback) {
    try {
        if (!this) {
            throw 'user was undefined or null';
        }

        if (!this.guid) {
            throw 'user.guid was undefined or null';
        }
        var empty = '';
        var sql = `update users set `
            + ` email = ${db.mask_str(this.email)},`
            + ` registerkey = ${db.mask_str(this.registerkey)},` 
            + ` alias = ${db.mask_str(this.alias)},`
            + ` hash = ${db.mask_str(this.hash)},`
            + ` salt = ${db.mask_str(this.salt)}`
            + ` where guid = ${db.mask_str(this.guid)}`;
        
        db.executesql(sql, (err, rows, fields) => {
            if (err) {
                callback(err, 1, undefined);
                return;
            }
            
            callback(undefined, 0, this);
            return;
        });
    }
    catch (e) {
        callback(e, 1, udefined);
        return;
    }
}

/**
* checks wheter the alias and email are available
* @function
* @callback validationRequest
*/
user.prototype.is_alias_email_available = function (callback) {
    try {
        if (!this || !this.alias || !this.email) {
            throw 'Alias or Email not set';
        }

        var sql = `select guid, alias, email from users where alias like \'${this.alias}\' or lower(email) like \'${this.email.toLowerCase()}\'`;

        db.executesql(sql, (err, rows, fields) => {
            if (err) {
                callback(err, false, undefined);
                return;
            }

            if (!rows || !rows.length || rows.length == 0) {
                callback(undefined, true, undefined);
                return;
            }
            else {
                var errorfields = new Array();

                for (var i = 0; i < rows.length; i++) {
                    if (rows[i].alias == this.alias && errorfields.indexOf('Alias') == -1) {
                        errorfields.push('Alias');
                    }

                    if (rows[i].email.toLowerCase() == this.email.toLowerCase() && errorfields.indexOf('Email') == -1) {
                        errorfields.push('Email');
                    }
                }

                callback(undefined, false, errorfields);
                return;
            }
        });

    } catch (e) {
        callback(e, undefined, undefined)
        return;
    }
}

/**
* Fills the user-object based on the registerkey-property
* @function
* @callback dbTransaction
* errorcodes:
*   0   Sucess
*   1   Unknown Error
*   2   no user found for that registerkey
*/
user.prototype.load_by_registerkey = function (callback) {

    try {
        if (!this.registerkey) {
            throw 'Cannot load by register key: no registerkey';
        }

        var sql = 'select * from users where registerkey = \'' + this.registerkey + '\'';
        db.executesql(sql, (err, rows, fields) => {
            if (err) {
                if(config.server.client_error_notification == 1){
                    callback(err, 1, undefined);
                    return;
                }
                else {
                    callback('Internal server error', 1, undefined);
                    return;
                }
            }

            if (!rows || !rows.length || rows.length != 1) {
                callback('Couldnt find a user for that key', 2, undefined);
                return;
            }

            this.alias = rows[0].alias;
            this.email = rows[0].email;
            this.guid = rows[0].guid;
            this.creation_date = rows[0].creation_date;

            callback(undefined, 0, this);
            return;
        });
    }
    catch (e) {
        callback(e, 1, undefined);
        return;
    }
}
/**
* @callback user~validationRequest
* @param {any} err error in case of non-sucessful execution
* @param {bool} valid represent wheter the request was validated or not
* @param {Array} info additional information about non-valid fields. Only filled if valid is false
*/

/** 
* @callback user~dbTransaction
* @param {any} err error in case of non-sucessful execution
* @param {number} errorCode error-code in case of non-sucessful execution
* @param {user} user the updated user-object
*/

module.exports = user;