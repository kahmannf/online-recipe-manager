

/**
 * @class
 * @constructor creates a searchrequest with default values
 */
const reciperequest = function (){
    /** @member {number} the page number requested */
    this.pagenumber = 1;

    /** @member {number} the amount of items per page */
    this.entries_per_page = 20;

    /** @member {string} sort: see reciperequest.sort_values for possible values */
    this.sort = 'rating';

    /** @member {bool} only recipes that are staredby the user */
    this.only_stared = false;

    /** @member {bool} only recipes that where created by the user */
    this.only_own = false;
}

reciperequest.sort_values = function (){
    return ['rating', 'newest'];
}

module.exports = reciperequest;