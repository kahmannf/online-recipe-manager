module.exports = {
    data (){
        return {
            email: '',
            alias: '',
            response_message: 'Bitte gib deine Daten ein:',
            response_color: 'black',
            alias_color: 'black',
            email_color: 'black',
        }
    },
    methods: {
        send_request: function () {
            try {

                this.alias_color = 'black';
                this.email_color = 'black';

                if (!this.email || this.email.length < 6) {
                    
                    this.response_message = 'Das ist keine gültige E-mail!';
                    this.response_color = 'red';
                    this.email_color = 'red';
                    return;
                }

                if (!this.alias || this.alias.length < 3) {

                    this.response_message = 'Das Alias muss mindestens 3 Zeichen lang sein';
                    this.response_color = 'red';
                    this.alias_color = 'red';
                    return;
                }

                if (!/^\w+$/.test(this.alias)) {
                    this.response_message = 'Das Alias darf nur Buchstaben, Zahlen oder';
                    this.response_color = 'red';
                    this.alias_color = 'red';
                    return;
                }


                this.response_message = 'Schicke Registrierungsanfrage an den Server...';
                this.response_color = 'black';
                
                var req = new XMLHttpRequest();
                var path = '/user/register';
                req.open("POST", path, true);
                req.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
                req.onreadystatechange = () =>{
                    if (req.readyState === 4 && req.status == 201) {
                        console.log(req.response.status);
                        console.log(req.responseText);

                        this.response_message = 'Registrierung Schritt 1 abgeschlossen.'
                                              + ' Du solltest in den nächsten Minuten eine '
                                              + ' Email zur Festlegung deines Passworts erhalten.';

                        this.response_color = 'green';

                    }
                    else if (req.readyState === 4 && req.status == 900) {
                        this.response_message = 'Die folgenden Felder sind bereits vergeben: ' + JSON.parse(req.responseText);
                        this.response_color = 'red';
                    }
                    else if (req.readyState === 4) {
                        this.response_message = 'Sorry da ist etwas schiefgelaufen: Server antwortete mit dem Code \'' + req.status + '\'. Bitte versuche es später noch mal.' + req.responsetext;
                        this.response_color = 'red';
                    }
                }
                req.send(JSON.stringify({ email: this.email, alias: this.alias }));
            } catch (e) {
                console.error('Error in register.vue: methode \'send_request\'');
                console.error(e);
                
            }
        }
    }
};