const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EventSchema = new Schema({
  eventData: Object,
  createdAt: { type: Date, default: Date.now }
});
module.exports.BidEventModel = mongoose.model("BidEvent", EventSchema);

const eventTypes = {
  createBid: "CreateBid"
};

module.exports.bidEventTypes = eventTypes;

module.exports.CreateBid = (id, bid) => {
  return {
    type: eventTypes.createBid,
    id,
    amount: bid.amount,
    currency: bid.currency
  }
}