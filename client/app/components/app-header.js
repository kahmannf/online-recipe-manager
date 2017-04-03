const displayuser_control = require('./app-header-comp/displayuser.vue');

module.exports = {
    data() {
        return {
        };
    },
    props: ["appstate"],
    components: {
        displayuser_control,
    },
}