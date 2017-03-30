module.exports = {
    data (){
        return {
            email: '-',
            alias: '-',
            guid_user: '',
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
                if(!this.key_set) {
                    return;
                }

                if (!this.password || this.password == '') {
                    this.response_message = "Bitte gibt ein Passwort ein";
                    this.response_color = 'red';
                    return;
                }

                if (this.password.length < 3) {
                    this.response_message = "Das Passwort muss mindestens 3 Zeichen haben";
                    this.response_color = 'red';
                    return;
                }

                this.response_message = 'Sende Anfrage an den Server...';
                this.response_color = 'black';

                this.key_set = false;

                var req = new XMLHttpRequest();
                var path = '/user/setpassword';
                req.open("POST", path, true);
                req.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
                req.onreadystatechange = () => {
                    if (req.readyState === 4 && req.status == 200) {
                        //Todo: think about redirecting directly
                        this.response_message = 'Benutzer erfolgreich erstellt!';
                        this.response_color = 'green';
                    }

                    else if(req.readyState === 4){
                        this.response_message = 'Da ist etwas schiefgelaufen. ' + req.responseText;
                        this.response_color = 'red';
                    }
                }

                req.send(JSON.stringify({ 
                    guid: this.guid_user,
                    password: this.password,
                    registerkey: this.registerkey,  
                }));

            } catch (e) {
                console.error('Error in register.vue: methode \'send_request\'');
                console.error(e);

            }
        }
    },
    created: function () {

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

        this.registerkey = geturlparams()['key'];

        this.key_set = this.registerkey != undefined;

        if(this.key_set)
        {
            var req = new XMLHttpRequest();
            var path = '/user/byregisterkey/' + this.registerkey;


            req.open("GET", path, true);
            req.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
            req.onreadystatechange = () => {
                if (req.readyState === 4 && req.status == 200) {
                    this.response_message = 'Bitte wähle ein Passwort';
                    this.response_color = 'black';
                    var data = JSON.parse(req.responseText);
                    this.email = data.email;
                    this.alias = data.alias
                    this.guid_user = data.guid;
                }
                else if(req.readyState === 4 && req.status == 900){
                    this.response_message = 'Der Registrierungskey ist ungültig';
                    this.key_set = false;
                    this.response_color = 'red';
                }

                else if (req.readyState === 4){
                    this.response_message = req.responseText;
                    this.key_set = false;
                    this.response_color = 'red';
                }
            }

            req.send();
        }
        else {
            this.response_message = 'Der Link zu dieser Seite ist ungültig';
            this.response_color = 'red';
        }
    }
}