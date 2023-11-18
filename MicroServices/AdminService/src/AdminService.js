const BidModel = require("./BidModel");
const MessageModel = require("./MessageModel");
const BddModel = require("./BddModels");

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
        msg: messageEvent.msg,
      }).save();
    } else {
      console.log("Message doesn't contain message");
      console.log("--------------------------");
      return Promise.resolve();
    }
  }

  addStep(stepEvent) {
    if (stepEvent.msg && stepEvent.msg.trim() !== "") {
      console.log("Adding step", stepEvent.context, stepEvent.content);
      console.log("--------------------------");
      return new BddModel["StepModel"]({
        idRef: stepEvent.idRef,
        lang: stepEvent.lang,
        make: stepEvent.make,
        category: stepEvent.category,
        content: stepEvent.content,
        arguments: stepEvent.arguments,
        code: stepEvent.arguments,
        updateAt: null,
        createBy: stepEvent.userId,
        updateBy: null
      }).save();
    } else {
      console.log("Step doesn't contain step");
      console.log("--------------------------");
      return Promise.resolve();
    }
  }
  getLastStepModel() {
    return BddModel["StepModel"].find({});
  }
  getLastMessages() {
    return MessageModel.find({});
  }
  getHighBids() {
    return BidModel.find({});
  }
}

module.exports = AdminService;
