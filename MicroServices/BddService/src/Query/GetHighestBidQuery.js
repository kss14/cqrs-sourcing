const storeService = require("../../../_Common/store");

class GetHighestBidQuery {
  run() {
    return storeService.getHighestBidView();
  }
}

module.exports = GetHighestBidQuery;
