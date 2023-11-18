//src/Command/CreateFeatureCommand
const storeService = require("../../../_Common/store");
const uuid = require("node-uuid");
const { CreateFeature } = require("../events");

class CreateFeatureCommand {
  constructor(step) {
    this.step = step;
  }

  run() {
    const id = uuid.v4();
    const event = CreateFeature(id, this.step);
    const events = [event];
    return storeService.store(events)
  }
}

module.exports = CreateFeatureCommand;
