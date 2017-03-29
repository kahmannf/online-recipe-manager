const Vue = require('vue');
module.exports = new Vue({
    data (){
        return {
            email: '',
            alias: '',
            response_message: 'Please enter your credentials',
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
                    
                    this.response_message = 'That is not a valid e-mail!';
                    this.response_color = 'red';
                    this.email_color = 'red';
                    return;
                }

                if (!this.alias || this.alias.length < 3) {

                    this.response_message = 'Aliases have to be at least 3 characters long';
                    this.response_color = 'red';
                    this.alias_color = 'red';
                    return;
                }

                if (!/^\w+$/.test(this.alias)) {
                    this.response_message = 'Aliases may only contain letters, numbers and underscores';
                    this.response_color = 'red';
                    this.alias_color = 'red';
                    return;
                }


                this.response_message = 'Sending registration-request to the server';
                this.response_color = 'black';
                
                var req = new XMLHttpRequest();
                var path = '/user/register';
                req.open("POST", path, true);
                req.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
                req.onreadystatechange = () =>{
                    if (req.readyState === 4 && req.status == 201) {
                        console.log(req.response.status);
                        console.log(req.responseText);

                        this.response_message = 'Registration first step sucessful. You should recieve a email with a link to finalize the registration.';
                        this.response_color = 'green';

                    }
                    else if (req.readyState === 4 && req.status == 900) {
                        this.response_message = 'The following fields are already in use: ' + JSON.parse(req.responseText);
                        this.response_color = 'red';
                    }
                    else if (req.readyState === 4) {
                        this.response_message = 'Sorry something went wrong: Server responded with code \'' + req.status + '\'. Please try again later.' + req.responsetext;
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
});