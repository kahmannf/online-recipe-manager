'use strict';
module.exports = {
    port: process.env.SERVER_PORT,
    log_incoming_requests: process.env.LOG_INCOMING_REQUSTS,
    loglevel: process.env.LOGLEVEL,
    client_error_notification: process.env.CLIENT_ERROR_NOTIFICATION,
    baseurl: process.env.BASEURL,
    cache_item_liftime: process.env.CACHE_ITEM_LIFETIME,
    max_cache_size: process.env.MAX_CACHE_SIZE,
}