const storeService = require("../../../_Common/store");

class GetMessagesByOrderOfMostRecentQuery {
    _option = null

    constructor(option) {
        this._option = option
    }

    run() {
        return storeService.getMessagesByOrderOfMostRecentView(this._option);
    }
}

module.exports = GetMessagesByOrderOfMostRecentQuery;