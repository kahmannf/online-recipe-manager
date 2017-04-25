const recipelist_item = require('./recipelistitem.vue');

module.exports = {
    data() {
        return {
            
        };
    },
    props: ['recipes'],
    components: {
        recipelist_item,
    },
}