const express = require('express');

const router = express.Router();

const config = require('../../config');

const reciperequest = require('../../model/reciperequest');

const recipe_objects = require('../../model/recipe');



//Responsecodes:
//
//  200     Request sucessful, recipes in response
//
//  400     Bad request: Insufficent reciperequest data/invalid reciperequest
//
//  500     Unknown server Error
//
router.post('/', (req, res) => {
    try {

        if (!req.body || !req.body.search) {

            req.body.search = new reciperequest(); // will get first page sorted by rating

            //res.status(400).send('no reciperequest provided');
            //return;
        }

        var guid_user = undefined;

        if (req.session.user_loggedin) {
            guid_user = req.session.user_loggedin.guid;
        }

        recipe_objects.search.searchbyrequest(guid_user, req.body.search, (err, result) => {
            try {
                if (result) {

                    var callbackresult = [];

                    var error_count = 0;

                    var startindex = (req.body.search.pagenumber - 1) * req.body.search.entries_per_page;

                    if (startindex == NaN) {
                        res.status(500).send('Invalid Data');
                        return;
                    }

                    if (startindex >= result.length) {
                        res.status(400).send('The requested page doenst exists');
                        return;
                    }

                    for (var i = startindex; i < result.length && i - startindex < req.body.search.entries_per_page; i++) {
                        var recp = new recipe_objects.recipe();
                        recp.guid = result[i].guid;
                        recp.load((err, status, recipe) => {

                            if (err) {
                                error_count++;
                            }
                            else {
                                callbackresult.push(recipe);
                            }

                            if (callbackresult.length + error_count >= req.body.search.entries_per_page) {
                                res.status(200).send(JSON.stringify(callbackresult));
                            }
                        });
                    }
                }
                else {
                    throw err;
                }
            }
            catch (err) {
                res.status(500).send((config.server.client_error_notification == 1 ? err : 'Internal server error'));
            }
        });
    }
    catch(e){
        res.status(500).send(config.server.client_error_notification == 1 ? e : '');
        return;
    }
});

module.exports = router;