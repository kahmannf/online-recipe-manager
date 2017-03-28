const Vue = require('vue');
module.exports = new Vue({
    data() {
        return {
            email: '',
            alias: '',
            registerkey: '',
            response_message: 'Please enter your credentials',
            response_color: 'black',
            password: '',
        }
    },
    methods: {
        created: function () {

            this.response_message = 'Loading user data... Please wait';
            this.response_color = 'black';

            var urlparams = function(){
                var assoc  = {};
                var decode = function (s) { return decodeURIComponent(s.replace(/\+/g, " ")); };
                var queryString = location.search.substring(1); 
                var keyValues = queryString.split('&'); 

                for(var i in keyValues) { 
                    var key = keyValues[i].split('=');
                    if (key.length > 1) {
                    assoc[decode(key[0])] = decode(key[1]);
                    }
                } 

                return assoc; 
            };

            var req = new XMLHttpRequest();
            var path = '/user/byregisterkey/' + urlparams()['key'];


            req.open("GET", path, true);
            req.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
            req.onreadystatechange = () => {
                if (req.readyState === 4 && req.status == 200) {
                    this.response_message = 'Your account was sucessful validated';
                }

                else if (req.readyState === 4){
                    this.response_message = req.responseText;
                }
            }

            req.send();
        },
        send_request: function () {
            try {

                this.response_message = 'Sending registration-request to the server';
                this.response_color = 'black';

                var req = new XMLHttpRequest();
                var path = '/user/setpassword';
                req.open("POST", path, true);
                req.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
                req.onreadystatechange = () => {
                    if (req.readyState === 4 && req.status == 200) {
                    }
                }

                req.send(JSON.stringify({ email: this.email, alias: this.alias }));

            } catch (e) {
                console.error('Error in register.vue: methode \'send_request\'');
                console.error(e);

            }
        }
    }
});