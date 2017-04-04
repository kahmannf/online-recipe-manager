const assert = require('assert');
const user = require('../server/model/user');
const uuid = require('uuid');
const db = require('../server/db');


describe('User', function() {
    
    describe('#insert_new()', function (){
        it('should create a new user', function(){
            var email = uuid() + '@kahmann.com';
            var newuser = new user();
            newuser.email = email;
            newuser.alias = 'Tester' + new Date();

            newuser.generate_registerkey();

            newuser.insert_new(function(error, status, createduser){
                try {
                    db.executesql('delete fromusers where guid = ' + db.mask_str(createduser.guid))
                }
                catch(e){
                    console.log(e);
                }


                assert.equal(error, undefined, error);
                assert.equal(status, 0, 'User insert_new status was not 0');
                assert.equal(createduser.alias, credentials.alias);
                assert.equal(createduser.email, credentials.email);
                assert.notEqual(createduser.guid, undefined);
                assert.notEqual(createduser.guid, null);
                userguid = createduser.guid;
            });
        });
    });

    describe('#load()', function(){
        it('Should load the user from the database', function(){
            var newuser;
            try{
                newuser = new user();
                newuser.email = uuid() + '@kahmann.com';
                newuser.alias = 'Tester' + new Date();
            }
            catch(e){
                Assert.ifError(e);
            }


            var loaduser = new user();

            loaduser.guid = newuser.guid;
            loaduser.load(function (err, status, loadeduser) {
                try {
                    db.executesql('delete fromusers where guid = ' + db.mask_str(createduser.guid))
                }
                catch(e){
                    console.log(e);
                }
                assert.ifError(err);
                assert.equal(status, 0);
                assert.notEqual(loadeduser, undefined);
                assert.equal(loadeduser.alias, credentials.alias);
                assert.equal(loadeduser.email, credentials.email);
                assert.equal(loadeduser.registerkey, credentials.registerkey);
            });
        });
    });

    describe('#login()', function(){
        it('Should verify email and password', function(){
            var verifyuser = new user();
            verifyuser.email = uuid();
            verifyuser.login('test123', (err, status, loggedinuser) => {
                assert.equal(status, 2, 'Userlogin returned status' + status + 'altough status 2 was expected\n'+ err);
            });

            verifyuser.email = 'felix@kahmann.de'

            verifyuser.login('test321', (err, status, loggedinuser) => {
                assert.equal(status, 3, 'Userlogin returned status' + status + 'altough status 3 was expected \n'+ err);
            });

            verifyuser.login('test123', (err, status, loggedinuser) => {
                assert.equal(status, 0, 'Userlogin failed: '+ err);
            });
        })
    });
});