const Vue = require('vue');
const App = require('./app.vue');

const app = new Vue({
    el: '#app',
    render: function (createElement) {
        return createElement(App)
    },
});