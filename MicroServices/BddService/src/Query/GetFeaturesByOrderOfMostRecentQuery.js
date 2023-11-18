const storeService = require("../../../_Common/store");

class GetFeaturesByOrderOfMostRecentQuery {
    _option = null

    constructor(option) {
        this._option = option
    }

    run() {
        return storeService.getFeaturesByOrderOfMostRecentView(this._option);
    }
}

module.exports = GetFeaturesByOrderOfMostRecentQuery;
