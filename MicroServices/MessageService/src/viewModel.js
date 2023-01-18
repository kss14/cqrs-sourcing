const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MessageViewSchema = new Schema({
  id: String,
  msg: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("MessageView", MessageViewSchema);
