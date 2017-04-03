const login_control = require('./app-body-comp/login/login.vue');

module.exports = {
    data() {
        return {
        };
    },
    props: ["appstate", "view"],
    components: {
        login_control,
    }
}