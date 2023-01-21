const express = require("express");
const atob = require("atob");
const { queryService, commandService, GetLastMessageQuery,CreateMessageCommand, GetBidsByOrderOfMostRecentQuery} = require("./src/_libs");
const Sentry = require("@sentry/node");
const {MessageEventModel} = require("./src/events");
const GetMessagesByOrderOfMostRecentQuery = require("./src/Query/GetMessagesByOrderOfMostRecentQuery");
Sentry.init({
    dsn: "http://9b819ce0be384b648e3a5b8f758ac073@glitchtip.kmp.com:8000/1"
});
//dsn: "http://c0ef338276fe46739bc4f8b008e8c71b@glitchtip.kmp.com:8000/1"
const app = express();
app.use(Sentry.Handlers.requestHandler());

app.use(express.json());

app.get("/api/v1/messages", async (req, res) => {
    const query = new GetLastMessageQuery();
    console.log("Getting lastest message");
    console.log("--------------------------");
    const message = await queryService.runQuery(query);
    res.json(message);
});

app.get("/api/v1/messages/query", async (req, res) => {
    const query = new GetMessagesByOrderOfMostRecentQuery(JSON.parse(atob(req.query.data)));

    console.log("Getting list messages aren't dispatched");
    console.log("--------------------------");
    const message = await queryService.runQuery(query);
    res.json(message);
});

app.post("/api/v1/messages", (req, res) => {
    const message = {msg: req.body.msg};
    const command = new CreateMessageCommand(message);
    // We want to allow maximum throughput so we don't wait for the write to happen before returning a response.
    wait(2000, () => {
      console.log("Placing message", message);
      console.log("--------------------------");
      commandService.runCommand(command)
    });

    res.json(message);
});

app.get("/debug-sentry", function mainHandler(req, res) {
  myUndefinedFunction();

    throw new Error("My first GlitchTip error!");
});

// The error handler must be before any other error middleware and after all controllers
app.use(Sentry.Handlers.errorHandler());

// Optional fallthrough error handler
app.use(function onError(err, req, res, next) {
    // The error id is attached to `res.sentry` to be returned
    // and optionally displayed to the user for support.
    res.statusCode = 500;
    res.end(res.sentry + "\n");
});


module.exports = app;

const wait = (timeout, fn) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(fn());
    }, timeout);
  })
};