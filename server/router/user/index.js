'use strict';
const mysql = require('mysql');

const express = require('express');
const router = express.Router();

const config = require('../../config');

const emailclient = require('../../email');

const db = require('../../db');
const security = require('../../security');

const user = require('../../model/user');

router.param('registerkey', (req, res, next, registerkey) => {
    req.registerkey = registerkey;
    next();
});

//
//  200     Request sucessful
//
//  400     Invalid Arguments/Params
//
//  900     No user found for registerkey
//
router.get('/byregisterkey/:registerkey', (req, res) => {
    try {

        if (!req.registerkey) {
            res.status(400).send((config.server.client_error_notification == 1 ? 'Es wurde kein Registerkey mitgegeben.' : 'Aktion nicht möglich.'));
        }
        var requser = new user();
        requser.registerkey = req.registerkey;

        if(requser.registerkey == 'Dummy'){
            requser.alias = 'Dummy';
            requser.email = 'dummy@kahmann.com';
            requser.guid = 'abcdefghijklmnopqrstuvwxyz';

            res.status(200).json(requser);
            return;
        }

        requser.load_by_registerkey((err, status, requser) => {
            if (err) {
                if (config.server.client_error_notification == 1) {
                    res.status(500).send(err);
                    return;
                }
                else {
                    res.status(500).send('Internal server error');
                    return;
                }
            }

            if (status == 2) {
                res.status(900).send((config.server.client_error_notification == 1 ? 'Ungültiger Registerkey.' : 'Aktion nicht möglich.'));
                
            }

            res.status(200).json(requser);
            return;
        });
    }
    catch (e) {
        if (config.server.client_error_notification == 1) {
            res.status(500).send(e);
            return;
        }
        else {
            res.status(500).send('Internal server error');
            return;
        }
    }
});

//
//  200     Request sucessful
//
//  400     no sessionuser
//
router.get('/current', (req, res) => {
    if (req.session.user_loggedin && req.session.user_loggedin != null) {
        var senduser = new user();

        var loguser = req.session.user_loggedin;

        senduser.alias = loguser.alias;
        senduser.email = loguser.email;

        res.status(200).send(JSON.stringify(senduser));
        return;
    }
    else {
        res.status(400).send();
        return;
    }
});

//Returncodes:
//
//  200     Sucessful Login
//
//  900     Invalid email/password combination
//  901     User not Registered
//
router.post('/login', (req, res) => {
    if (!req.body.email || !req.body.password) {
        res.status(400).send('');
        return;
    }

    var loginuser = new user();
    loginuser.email = req.body.email;
    loginuser.login(req.body.password, (err, statuscode, loginuser) => {
        if (err) {
            switch (statuscode) {
                case 1:
                    res.status(500).send(config.server.client_error_notification == 1 ? err : 'Internal server error');
                    return;
                case 2:
                    res.status(901).send('');
                    return;
                case 3:
                    res.status(900).send('');
                    return;
            }
        }
        
        req.session.user_loggedin = loginuser;
        req.session.save((err) => { console.log(err); });

        res.status(200).send('');
    });
});

//
//Returncodes:
//
//  201     Sucessful Register
//
//  400     Invalid arguments
//  500     Unexpected error
//  900     alias/email already exists
// 
router.post('/register', (req, res) => {
    try {
        if (req.body && req.body.email && req.body.alias) {

            var newuser = new user();
            newuser.email = req.body.email;
            newuser.alias = req.body.alias;
            newuser.generate_registerkey();

            newuser.is_alias_email_available((err, valid, info) => {
                if (err) {
                    throw err;
                }

                if (valid) {
                    newuser.insert_new((err, bla) => {
                        if (err) {
                            throw err;
                        }
                        else {
                            emailclient.registrationmail(newuser);
                            res.status(201).send('User erstellt');
                        }
                    });
                }
                else {
                    res.status(900).send(JSON.stringify(info));
                }
            });
        }
        else {
            throw 'Nicht genügend Informationen vorhanden.';
        }
    }
    catch (e) {
        if (config.server.client_error_notification == 1)
        {
            res.status(500).send(e);
            return;
        }
        res.status(500).send('Internal server error');
        return;
    }
})

//  200     Operation successful
//
//  400     Not enough/Invalid data provided
//  900     User not found
//  901     User could not be updated
//
router.post('/setpassword', (req, res) => {
    if(!req.body || !req.body.registerkey || !req.body.guid || !req.body.password){
        res.status(400).send('Nicht genügend Daten vorhanden');
        return;
    }

    var pwuser = new user();
    pwuser.registerkey = req.body.registerkey;
    pwuser.load_by_registerkey((err, status, pwuser)=>{
        if(err){
            res.status(900).send(config.server.client_error_notification == 1 ? err : 'Laden des Users aus der Datenbank fehlgeschlagen');
            return;
        }
        
        var sec_data = security.createnew_password_hash(req.body.password);

        pwuser.hash = sec_data.passwordHash;
        pwuser.salt = sec_data.salt;

        pwuser.registerkey = null;

        pwuser.updateall((err, status, pwuser)=>{
            if(err){
                res.status(900).send(config.server.client_error_notification == 1 ? err : 'Updaten des Users in der Datenbank fehlgeschlagen');
                return;
            }

            res.status(200).send();
            return;
        });
        return;

    });
})

//
//  200     successful performed logout
//
//  500     Internal Server error
//
router.post('/logout', (req, res) => {
    try {
        req.session.user_loggedin = undefined;
        req.session.save((err) => { console.log(err) });
        res.status(200).send();
        return;
    }
    catch (e) {
        res.status(500).send();
        return;
    }
});

module.exports = router;