const storeService = require("../../../_Common/store");

class GetLastMessageQuery {
  run() {
    return storeService.getLastMessageView();
  }
}

module.exports = GetLastMessageQuery;
