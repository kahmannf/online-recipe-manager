'use strict';
const uuid = require('uuid/v4');
const db = require('../../db');
const config = require('../../config');
const cache = require('../cache');
const user = require('../user');

const rec_cache = new cache();

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
    /** @member {owner} user, that created the recipe */
    this.owner = null;
}

/**
 * Loads a recipe by the guid from either the cache or the database
 * @function
 * @callback dbTransaction
 */
recipe.prototype.load = function (callback) {
    rec_cache.getifhas(this.guid, (err, citem) => {
        if (err) {
            this.loadfromdb((err, status, recipe) => {
                if (err) {
                    callback(err, status, undefined);
                    return;
                }

                rec_cache.add(recipe.guid, recipe, (err) => {
                    if (err) {
                        //Todo think about this...
                    }
                });

                callback(undefined, 0, recipe);
                return;
            });
        }
        else {
            callback(undefined, 0, citem.item);
            return;
        }
    });
}

/**
 * Loads a recipe by the guid from the database
 * @function
 * @callback dbTransaction
 */
recipe.prototype.loadfromdb = function (callback) { 

    var sql = 'select * from recipes where guid = ' + db.mask_str(this.guid);

    var components_loaded = 0;
    var components_toload = 0;

    var errors = [];

    var trycallback = () => {
        if (components_loaded >= components_toload) {

            if (errors.length > 0) {
                callback(errors, 1, undefined);
                return;
            }
            else {
                callback(undefined, 0, this);
                return;
            }
        }
    };

    components_toload++;

    db.executesql(sql, (err, rows, fields) => {
        components_loaded++;

        if (err) {
            errors.push(err);
        }
        else if (rows && rows.length > 0) {

            this.name = rows[0].name;

            components_toload++;
            
            this.owner = new user();
            this.owner.guid = rows[0].guid_owner;

            this.owner.load((err, status, loadeduser) => {
                components_loaded++;
                if (err) {
                    errors.push(err);
                }
                else {
                    this.owner = loadeduser;
                }
                trycallback();
                return;
            });
        }

        trycallback();
        return;
    });
}

/** 
* @callback recipe~dbTransaction
* @param {any} err error in case of non-sucessful execution
* @param {number} errorCode error-code in case of non-sucessful execution
* @param {recipe} recipe the updated recipe-object
*/


module.exports = recipe;