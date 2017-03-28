const loc_de = require('localization/de');
const loc_default = require('localization/default');

const localizer = function(resourse_name, contry_code){
    switch (contry_code.toLowerCase()){
        case 'de':
            return loc_de.get(resourse_name, loc_default);
        default:
            return loc_default.get(resourse_name);
    }
}

module.exports = {localizer: localizer};