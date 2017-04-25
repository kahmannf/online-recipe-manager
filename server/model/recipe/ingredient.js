'use strict';
const uuid = require('uuid/v4');
const db = require('../../db');
const config = require('../../config');


/**
 * @class
 * @constructor creates a new empty ingredient with a new guid
 */
const ingredient = function(){
    /** @member {string} */
    this.guid = uuid();
    /** @member {string} */
    this.name = null;
    /** @member {string} */
    this.unit_name
    /** @member {string} */
    this.guid_unit
}

module.exports = ingredient;