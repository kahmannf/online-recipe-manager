const recipelist = require('../recipelist/recipelist.vue');

const reciperequest = require('../../../../../server/model/reciperequest');

module.exports = {
    data() {
        return {
            display_recipes: [],
        };
    },
    methods: {
        loadpage: (pagenumber) => {
            var rec_req = new reciperequest();
            rec_req.pagenumber = pagenumber;

            var req = new XMLHttpRequest();
            var path = '/recipes';
            req.open("POST", path, true);
            req.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
            req.onreadystatechange = () => {
                if (req.readyState === 4 && req.status == 200) {
                    console.log(req.responseText);
                    display_recipes = JSON.parse(req.responseText);
                }
            }

            req.send(JSON.stringify({
                search: rec_req,
            }));
        },
    },
    props: ['appstate'],
    components: {
        recipelist
    },
    mounted() {
        this.loadpage(1);
    },
}