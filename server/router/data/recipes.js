const express = require('express');

const router = express.Router();

const config = require('../../config');




//Responsecodes:
//
//  200     Request sucessful, recipes in response
//
//  400     Bad request: Insufficent reciperequest data/invalid reciperequest
//
router.get('/', (req, res) => {
    try {
        if(!req.body){
            res.status(400).send('no reciperequest provided');
            return;
        }

        //assume that req.body is a reciperequest
        

    }
    catch(e){
        res.status(500).send(config.server.client_error_notification == 1 ? e : '');
        return;
    }
});

module.exports = router;