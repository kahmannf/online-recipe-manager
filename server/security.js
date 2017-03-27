const crypto = require('crypto');

/**
 * generates random string of characters i.e salt
 * @function
 * @param {number} length - Length of the random string.
 */
const genRandomString = function (length) {
    return crypto.randomBytes(Math.ceil(length / 2))
        .toString('hex') /** convert to hexadecimal format */
        .slice(0, length);   /** return required number of characters */
};

/**
 * hash password with sha512.
 * @function
 * @param {string} password - List of required fields.
 * @param {string} salt - Data to be validated.
 */
const sha512 = function (password, salt) {
    var hash = crypto.createHmac('sha512', salt); /** Hashing algorithm sha512 */
    hash.update(password);
    var value = hash.digest('hex');
    return {
        salt: salt,
        passwordHash: value
    };
};

module.exports = {
    /**
    * @function
    * @param {string} password - password, has and salt will be generated for
    * @returns {string,string} - hash and salt
    */
    createnew_password_hash: (password) => {
        var salt = genRandomString(50);
        return sha512(password, salt);
    },
    /**
    * compares a password to a hash using the salt
    * @function
    * @param {string} password
    * @param {string} salt
    * @param {string} hash
    * @returns {bool} whether the password belongs to the salt and hash
    */
    comparepassword: (password, salt, hash) => {
        return sha512(password, salt).passwordHash == hash;
    }
}