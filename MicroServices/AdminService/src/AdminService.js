const BidModel = require("./BidModel");
const MessageModel = require("./MessageModel");

class AdminService {
  addHighBid(bidEvent) {
    if (bidEvent.amount > 10_000) {
      console.log("Adding high bid", bidEvent.amount);
      console.log("--------------------------");
      return new BidModel({
        bidId: bidEvent.id,
        amount: bidEvent.amount,
        currency: bidEvent.currency
      }).save();
    } else {
      console.log("Bid too small to be a high bid");
      console.log("--------------------------");
      return Promise.resolve();
    }
  }

  addMessage(messageEvent) {
    if (messageEvent.msg && messageEvent.msg.trim() !== "") {
      console.log("Adding message", messageEvent.msg);
      console.log("--------------------------");
      return new MessageModel({
        messageId: messageEvent.id,
        msg: messageEvent.amount,
      }).save();
    } else {
      console.log("Message doesn't contain message");
      console.log("--------------------------");
      return Promise.resolve();
    }
  }
  getLastMessages() {
    return MessageModel.find({});
  }
  getHighBids() {
    return BidModel.find({});
  }
}

module.exports = AdminService;
