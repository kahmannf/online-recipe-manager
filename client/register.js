module.exports = {
    data (){
        return {
            email: '',
            response_message: '',
            response_color: '',
        }
    },
    methods: {
        send_request: function(email) {
            if(!email || email.length < 6) {
                response_message = 'That is not a valid e-mail!';
                response_color = '#f00';
                return;
            }

            response_message = 'Sending an request to the server';
            response_color = '#000';

            var req = new XMLHttpRequest();
            var path = '/user/register';
            req.onreadystatechange = () =>{
                if(req.readyState === 4 && req.status == 200){
                    req.setRequestHeader("Content-Type", "text/plain; charset=UTF-8");
                    req.open("POST", path, true);
                    req.send('{"email":'+ email +'}'); 
                }
            }
        }
    }
}