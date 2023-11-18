const storeService = require("../../../_Common/store");

class GetScenariosByOrderOfMostRecentQuery {
    _option = null

    constructor(option) {
        this._option = option
    }

    run() {
        return storeService.getScenariosByOrderOfMostRecentView(this._option);
    }
}

module.exports = GetScenariosByOrderOfMostRecentQuery;
