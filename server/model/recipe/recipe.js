'use strict';
const uuid = require('uuid/v4');
const db = require('../db');
const config = require('../config');


/**
 * @class
 * @constructor creates a new empty recipe with a new guid
 */
const recipe = function(){
    /** @member {string} */
    this.guid = uuid();
    /** @member {string} */
    this.name = null;
    /** @member {Array} array of ingredients */
    this.ingredients = [];
    /** @member {Array} array of steps */
    this.steps = [];
}

/**
 * Loads a recipe by the guid
 */
recipe.prototype.load = () => {
    
}

module.exports = recipe;