module.exports = {
    data() {
        return {
            password: '',
            email: '',
            email_color: '',
            password_color: '',
            errormessage: undefined,
            expanded: false,
        };
    },
    props: ["appstate"],
    methods: {
        login: function () {
            if (!this.email || this.email.length < 5) {
                this.email_color = 'backred';
                return;
            }

            if (!this.password || this.password.length == 0) {
                this.password_color = 'backred';
                return;
            }

            this.password_color = '';
            this.email_color = '';


            var req = new XMLHttpRequest();
            var path = '/user/login';
            req.open("POST", path, true);
            req.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
            req.onreadystatechange = () => {
                if (req.readyState === 4 && req.status == 200) {
                    this.appstate.user_loggedin = JSON.parse(req.responseText);
                }
                else if (req.readyState === 4 && req.status == 900) {
                    this.errormessage = 'Ung' + unescape("%FC") + 'ltige Login-Daten';
                }
                else if (req.readyState === 4 && req.status == 901) {
                    this.errormessage = 'Unbekannte Emailadresse: ' + this.email;
                }
                else if (req.readyState === 4) {
                    this.errormessage = 'Ein unbekannter Fehler ist aufgetreten';
                }
            }

            req.send(JSON.stringify({
                email: this.email,
                password: this.password,
            }));
        },
        register: function () {
            window.open('/register.html');
        }
    },
}