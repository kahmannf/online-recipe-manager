const app_header = require('./components/app-header.vue');
const app_body = require('./components/app-body.vue');

module.exports = {
    data() {
        return {
            appstate: {
                user_loggedin: null,
                changeview: (v) => {
                    this.view = v;
                },
                loadcurrentuser: function(){
                    this.loadcuruser();
                },
            },
            view: 'home',
        }
    },
    components: {
        app_header,
        app_body,
    },
    methods: {
        loadcuruser: function () {
            var req = new XMLHttpRequest();
            var path = '/user/current';
            req.open("GET", path, true);
            req.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
            req.onreadystatechange = () => {
                if (req.readyState === 4 && req.status == 200) {
                    this.appstate.user_loggedin = JSON.parse(req.responseText);
                }
            }

            req.send();
        }
    },
    mounted() {
         appstate.loadcurrentuser();
    },
}