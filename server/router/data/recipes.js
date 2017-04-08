const express = require('express');

const router = express.Router();




//Responsecodes:
//
//  200     Request sucessful, recipes in response
//
//  400     Bad request: Insufficent reciperequest data/invalid reciperequest
//
router.get('/', (req, res) => {
    if(!req.body){
        res.status(400).send('no reciperequest provided');
        return;
    }
});

module.exports = router;