//src/Command/CreateFeatureCommand
const storeService = require("../../../_Common/store");
const uuid = require("node-uuid");
const { CreateFeature } = require("../events");

class CreateFeatureCommand {
  constructor(feature) {
    this.feature = feature;
  }

  run() {
    const id = uuid.v4();
    const event = CreateFeature(id, this.feature);
    const events = [event];
    return storeService.store(events)
  }
}

module.exports = CreateFeatureCommand;
