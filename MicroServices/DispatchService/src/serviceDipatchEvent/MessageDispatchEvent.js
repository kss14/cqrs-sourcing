module.exports = (message) => {
  return {
    source: "place-message",
    id: message.id,
    msg: message.msg,
    createdAt: message.createdAt
  }
}
