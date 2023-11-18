const storeService = require("../../../_Common/store");

class GetStepsByOrderOfMostRecentQuery {
    _option = null

    constructor(option) {
        this._option = option
    }

    run() {
        return storeService.getStepsByOrderOfMostRecentView(this._option);
    }
}

module.exports = GetStepsByOrderOfMostRecentQuery;
