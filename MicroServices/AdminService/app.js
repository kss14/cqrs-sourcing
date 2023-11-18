const express = require("express");
const app = express();
const amq = require("amqplib/callback_api");
const { queueAttachToEvent } = require("../_Common/configs");
const AdminService = require("./src/AdminService");

const adminService = new AdminService();

app.use(express.json());

app.get("/getHighBids", async (req, res) => {
  const bids = await adminService.getHighBids();
  res.json(bids || {});
});

app.get("/getLastMessages", async (req, res) => {
  const messages = await adminService.getLastMessages();
  res.json(messages || {});
});

app.get("/getLastSteps", async (req, res) => {
  const setps = await adminService.getLastStepss();
  res.json(steps || {});
});

module.exports = app;

(async () => {
  let channel;

  const init = async () => {
    return new Promise((resolve, reject) => {
      amq.connect(process.env.MQ_URI || "amqp://localhost", (e1, conn) => {
        if (e1) return reject(e1);

        conn.createChannel((e2, channel) => {
          if (e2) return reject(e2);

          return resolve(channel);
        });
      });
    })
  }

  const run = (channel) => {
    console.log("Listener running");
    console.log("--------------------------");
    for ([key, queue] of Object.entries(queueAttachToEvent)) {
      channel.assertQueue(queue, {
        durable: false
      });

      channel.consume(queue, function (msg) {
        console.log(" [x] Received %s", msg.content.toString());
        if (msg.content.toString().indexOf('-bids"') !== -1) {
          adminService.addHighBid(JSON.parse(msg.content.toString()))
        }
        if (msg.content.toString().indexOf('-messages"') !== -1) {
          adminService.addMessage(JSON.parse(msg.content.toString()))
        }

        if (msg.content.toString().indexOf('-steps"') !== -1) {
          adminService.addStep(JSON.parse(msg.content.toString()))
        }
      }, {
        noAck: true
      });
    }
  }
  const interval = setInterval(async () => {
    console.log("Starting listener");
    console.log("--------------------------");

    if (!channel) {
      try {
        channel = await init();
      } catch (e) {
        console.log(e.message);
      }
    } else {
      clearInterval(interval);
      await run(channel);
    }
  }, 5_000);

})();
