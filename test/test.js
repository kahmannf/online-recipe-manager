const assert = require('assert');
const user = require('../server/model/user');
const credentials = {
    alias: 'Tester',
    password: 'test123',
    email: 'felix@kahmann.de',
}


describe('User', function() {
    var userguid;
    describe('#insert_new()', function (){
        it('should create a new user', function(){
            var newuser = new user();
            newuser.email = credentials.email;
            newuser.alias = credentials.alias;

            newuser.generate_registerkey();

            newuser.insert_new(function(error, status, createduser){
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
            assert.notEqual(userguid, undefined, 'userguid was undefined');
            assert.notEqual(userguid, null, 'userguid was null');
            var loaduser = new user();

            loaduser.guid = userguid
            loaduser.load(function (err, status, loadeduser) {
                assert.equal(err, undefined, err);
                assert.equal(status, 0);
                assert.notEqual(loadeduser, undefined);
                assert.equal(loadeduser.alias, credentials.alias);
                assert.equal(loadeduser.email, credentials.email);
                assert.equal(loadeduser.registerkey, credentials.registerkey);
            });
        });
    });
});