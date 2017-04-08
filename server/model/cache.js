
const config = require('../config');

/**
 * cache_item, general definition
 * @class
 * @constructor
 * @param {*} item 
 */
const cache_item = function(item){
    /** @member {Date} The time at which this object was created */
    this.creation_time = new Date();

    /** @member {number} lifetime of this object in seconds */
    this.lifetime = config.server.cache_item_liftime;

    /** @member {Date} The time at which this object becomes invalid */
    this.expires_at = new Date(creation_time.getTime() + lifetime * 1000);

    /** @member {*} The actual item */
    this.item = item;
}

/**
 * @class
 * @constructor
 */
const cache = function(){

    this.maxitemcount = config.server.max_cache_size;
    this.map = new Map();
}

/**
 * adds a item to the chache
 * @function
 * @param {string} id 
 * @param {*} a item that will be cached 
 * @callback cache_operation_callback
 */
cache.prototype.add = function (id, item, callback) {
    try {
        if(this.map.has(id)) {
            callback('The item already exists  in the cache', undefined);
            return;
        }
        else {
            var citem = new cache_item(item);
            this.map.set(id, citem);
            callback(undefined, citem);
            return;
        }
    }
    catch (err) {
        callback(err, unfined)
    }
}

/**
 * Gets a item by its identifier
 * if item is not in the map, callbacks error object will be a true boolean
 * @function
 * @param {string} id 
 * @callback cache_operation_callback
 */
cache.prototype.getifhas = function (id, callback) {
    try {
        if(!this.map.has(id)) {
            callback(true, undefined);
            return;
        }
        else {
            var item = this.map.get(id);
            if(item.expires_at >= new Date()) { // if item is expired, delete it
                this.map.delete(id);
                callback(true, undefined);
                return;
            } 
            else {
                callback(undefined, item);
                return;
            }
        }
    }
    catch(e){
        callback(e, undefined);
    }
}

/**
 * @callback cache_operation_callback
 * @param {*} err Error6
 * @param {cache_item} item the item (if required)
 */


module.exports = { cache }