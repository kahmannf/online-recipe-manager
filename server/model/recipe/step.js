'use strict';
const uuid = require('uuid/v4');
const db = require('../db');
const config = require('../config');


/**
 * @class
 * @constructor creates a new empty step with a new guid
 */
const step = function(){
    /** @member {string} */
    this.guid = uuid();
    /** @member {string} */
    this.text = null;
    /** @member {string} */
    this.guid_recipe = null;
    /** @member {number} Number to order all steps of a recipe */
    this.order = -1;
}

module.exports = step;