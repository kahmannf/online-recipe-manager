const login_control = require('./app-body-comp/login/login.vue');
const home = require('./app-body-comp/home/home.vue');

module.exports = {
    data() {
        return {
        };
    },
    props: ["appstate", "view"],
    components: {
        login_control,
        home,
    }
}