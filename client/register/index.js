const register = require('./register.vue');
const Vue = require('vue');

const app = new Vue({
    el: '#register',
    render: function (createElement) {
        return createElement(register)
    },
});