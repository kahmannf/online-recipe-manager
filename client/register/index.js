const register = require('./register.vue');

const app = new Vue({
    el: '#register',
    render: function (createElement) {
        return createElement(register)
    },
});