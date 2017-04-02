'use strict';
module.exports = {
    port: process.env.SERVER_PORT,
    log_incoming_requests: process.env.LOG_INCOMING_REQUSTS,
    loglevel: process.env.LOGLEVEL,
    client_error_notification: process.env.CLIENT_ERROR_NOTIFICATION,
    baseurl: process.env.BASEURL,
}