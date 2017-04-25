const db = require('../../db');

const recipe = require('./recipe');

/**
 * gets list of recipes based on reciperequest
 * @function
 * @param {string} guid_user guid of the user for whichs context the search will be executed.
 * @param {reciperequest} rec_req
 */
const searchbyrequest = (guid_user, rec_req, callback) => {
    try {
        var sql = 'select recipe_search.guid from recipe_search';

        if (guid_user) { // guid user has to be provided in order for this search to be possible

            if (rec_req.only_staredr) {

                sql += ', reluserrecipe ';
                sql += ' where guid_owner = ' + db.mask_str(guid_user);
                sql += ' and reluserrecipe.starred = true ';
            }

            if (rec_req.only_own) {

                sql += rec_req.only_stared ? ' and ' : ' where ';

                sql += 'recipe_search.guid_owner = ' + db.mask_str(guid_user);
            }
        }

        sql += ' order by ';

        switch (rec_req.sort) {
            case 'rating':
                sql += ' recipe_search.stars ';
                break;
            case 'newest':
            default:
                sql += ' recipe_search.creation_date ';
                break;
        }

        //Consider implementing costumizable sorting directions.
        //descending for now
        sql += ' desc';


        db.executesql(sql, (err, rows, fields) => {
            try {
                if (err) {
                    throw err;
                }

                callback(undefined, rows);
                return;
            }
            catch (ex) {
                callback(ex, undefined);
                return;
            }
        });
        return;
    }
    catch (err) {
        callback(err, []);
        return;
    }
}


module.exports = {
    searchbyrequest: searchbyrequest,
}

/**
 * @callback search_callback
 * @param {*} err Error
 * @param {Array} items the result of the search 
 */
