const dict = {

}

module.exports = {
    get: function (res_name, default_loc){
        if(!dict[res_name]){
            return default_loc(res_name);
        }
        else{
            return dict[res_name];
        }
    }
}