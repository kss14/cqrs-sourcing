const storeService = require("../../../_Common/store");

class GetBidsByOrderOfMostRecentQuery {
    _option = null

    constructor(option) {
        this._option = option
    }

    run() {
        return storeService.getBidsByOrderOfMostRecentView(this._option);
    }
}

module.exports = GetBidsByOrderOfMostRecentQuery;