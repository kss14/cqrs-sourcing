const storeService = require("../../../_Common/store");
const uuid = require("node-uuid");
const { CreateMessage } = require("../events");

class CreateMessageCommand {
  constructor(message) {
    this.message = message;
  }

  run() {
    const id = uuid.v4();
    const event = CreateMessage(id, this.message);
    const events = [event];
    return storeService.store(events)
  }


}

module.exports = CreateMessageCommand;
