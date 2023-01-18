const { messageEventTypes } = require("./events");

module.exports = (event, view) => {
  switch (event.type) {
    case messageEventTypes.createMessage:
      return {
        id: event.id,
        msg: event.msg
      };

    default:
      return view;
  }
}
