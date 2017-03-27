const Vue = require('vue');
const App = require('./app.vue');
const Register = require('./register.vue');

const app = new Vue({
    el: '#app',
    render: function (createElement) {
        return createElement(App)
    },
});

const register = new Vue({
    el: '#register',
    render: function (createElement) {
        return createElement(Register)
    },
});