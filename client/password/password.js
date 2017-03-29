const Vue = require('vue');
module.exports = new Vue({
    data() {
        return {
            email: '',
            alias: '',
            registerkey: '',
            response_message: 'Bitte gib deine Daten ein:',
            response_color: 'black',
            password: '',
        }
    },
    methods: {
        mounted: function () {

            this.response_message = 'Lade Nutzerdaten ... Bitte warten';
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
                    this.response_message = 'Dein Account wurde erfolreich erstellt.';
                }

                else if (req.readyState === 4){
                    this.response_message = req.responseText;
                }
            }

            req.send();
        },
        send_request: function () {
            try {

                this.response_message = 'Sende anfrage an den Server...';
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