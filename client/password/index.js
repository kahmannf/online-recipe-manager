const password = require('./password.vue');
const Vue = require('vue');

const app = new Vue({
    el: '#password',
    render: function (createElement) {
        return createElement(password)
    },
});