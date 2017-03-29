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
            key_set: '',
        }
    },
    methods: {
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
        },
        mounted: function () {

            var geturlparams = () => {
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
            }

            this.response_message = 'Lade Nutzerdaten ... Bitte warten';
            this.response_color = 'black';

            this.key_set = geturlparams()['key'] != undefined;

            if(this.key_set)
            {
                var req = new XMLHttpRequest();
                var path = '/user/byregisterkey/' + geturlparams()['key'];


                req.open("GET", path, true);
                req.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
                req.onreadystatechange = () => {
                    if (req.readyState === 4 && req.status == 200) {
                        this.response_message = 'Bitte wähle ein Passwort';
                        this.response_color = 'black';
                    }

                    else if (req.readyState === 4){
                        this.response_message = req.responseText;
                        this.response_color = 'red';
                    }
                }

                req.send();
            }
            else {
                this.response_message = 'Der Link zu dieser Seite ist ungültig';
            }
        }
    }
});