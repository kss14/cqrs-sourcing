const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EventSchema = new Schema({
  eventData: Object,
  createdAt: { type: Date, default: Date.now }
});

module.exports.MessageEventModel = mongoose.model("MessageEvent", EventSchema);

const eventTypes = {
  createMessage: "CreateMessage"
};

module.exports.messageEventTypes = eventTypes;


module.exports.CreateMessage = (id, message) => {
  return {
    type: eventTypes.createMessage,
    id,
    msg: message.msg,
  }
}