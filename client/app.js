const comp_header = require('./components/comp_header.vue');

module.exports = {
    data() {
        return {
            msg: 'Hello world',
            menu:
            [
                {
                    id: 0,
                    name: 'Home'
                },
                {
                    id: 1,
                    name: 'Contact us'
                },
                {
                    id: 2,
                    name: 'About'
                }
            ]
        }
    },
    components: {
        comp_header,
    }
}