const dict = {

}

module.exports = {
    get: function (res_name){
        if(!dict[res_name]){
            return default_loc(res_name);
        }
        else{
            return 'Missing resource:' + res_name;
        }
    }
}