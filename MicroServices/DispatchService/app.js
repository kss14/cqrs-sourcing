const mongoose = require("mongoose");
const amq = require("amqplib");
const EventDispatchService = require("./src/EventDispatchService");
const { queueAttachToEvent } = require("../_Common/configs");
let DispatchEvent = {}
DispatchEvent.BidDispatchEvent = require("./src/serviceDipatchEvent/BidDispatchEvent");
DispatchEvent.MessageDispatchEvent = require("./src/serviceDipatchEvent/MessageDispatchEvent");
const eventDispatchService = new EventDispatchService();

(async () => {
  let conn;
  let channel;
  let mongo;

  const run = async () => {
    if (!conn) {
      conn = await amq.connect(process.env.MQ_URI || "amqp://localhost")
      channel = await conn.createChannel();
    }

    if (!mongo) {
      mongo = await mongoose.connect(process.env.MONGO_URI || "mongodb://0.0.0.0:27017/app", {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
    }

    const dispatch = await eventDispatchService.findLastDispatchEvent();
    const allEvents = await eventDispatchService.findAllUnsentEvents(dispatch);

    const transfrormCollectionNameToFormatEvent = (collectioName) => {
      return collectioName.charAt(0).toUpperCase() + collectioName.slice(1).replace('events','Event');
    }
    const transfrormCollectionNameToFormatDispatchEvent = (collectioName) => {
      return collectioName.charAt(0).toUpperCase() + collectioName.slice(1).replace('events','DispatchEvent');
    }

    console.log("New events found: ", allEvents.length);
    console.log("--------------------------");

    for (const event of allEvents) {
      channel.assertQueue(queueAttachToEvent[transfrormCollectionNameToFormatEvent(event.collectionName)], {
        durable: false
      });

      const msg = JSON.stringify(DispatchEvent[transfrormCollectionNameToFormatDispatchEvent(event.collectionName)](Object.assign({}, { createdAt: event.createdAt, ...event.eventData })));

      channel.sendToQueue(queueAttachToEvent[transfrormCollectionNameToFormatEvent(event.collectionName)], Buffer.from(msg));
      console.log("Sent message: ", msg);
      console.log("--------------------------");
    }

    const lastEvent = allEvents[allEvents.length - 1];
    await eventDispatchService.storeLatestDispatch(lastEvent);
  };

  setInterval(async () => {
    console.log("Running dispatcher");
    console.log("--------------------------");
    try {
      await run();
    } catch (e) {
      console.log(e.message)
    }
  }, 5_000)

})();
