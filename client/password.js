module.exports = {
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
        load_userinfo: function () {

            this.response_message = 'Loading user data... Please wait';
            this.response_color = 'black';

            var req = new XMLHttpRequest();
            var path = '/user/byregisterkey';
            req.open("POST", path, true);
            req.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
            req.onreadystatechange = () => {
                if (req.readyState === 4 && req.status == 200) {
                }
            }
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
}