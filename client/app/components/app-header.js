module.exports = {
    data() {
        return {
        };
    },
    props: ["appstate"],
    methods: {
        logout: function () {

            var req = new XMLHttpRequest();
            var path = '/user/logout';
            req.open("POST", path, true);
            req.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
            req.onreadystatechange = () => {
                if (req.readyState === 4 && req.status == 200) {
                    this.appstate.user_loggedin = undefined;
                }
                else if (req.readyState === 4) {
                    alert('Fehler beim Abmelden!')
                }
            }

            req.send();
        },
    },
    components: {
    },
}