const express = require("express");
const atob = require("atob");
const app = express();
const { GetHighestBidQuery,GetBidsByOrderOfMostRecentQuery, queryService, CreateBidCommand, commandService } = require("./src/_libs");
app.use(express.json());

app.get("/api/v1/bids", async (req, res) => {
    const q = new GetHighestBidQuery();
    console.log("Getting highest bid");
    console.log("--------------------------");
    const bid = await queryService.runQuery(q);
    res.json(bid);
});
app.get("/api/v1/bids/query", async (req, res) => {
    const q = new GetBidsByOrderOfMostRecentQuery(JSON.parse(atob(decodeURIComponent(req.query.data))));
    console.log("Getting list bids aren't dispatched");
    console.log("--------------------------");
    const bid = await queryService.runQuery(q);
    res.json(bid);
});

app.post("/api/v1/bids", (req, res) => {
  const bid = { amount: parseFloat(req.body.number), currency: "SEK" };
  const c = new CreateBidCommand(bid);
  // We want to allow maximum throughput so we don't wait for the write to happen before returning a response.
  wait(2000, () => {
    console.log("Placing bid", bid);
    console.log("--------------------------");
    console.log(c)
    commandService.runCommand(c)
  });

  res.json(bid);
});

module.exports = app;

const wait = (timeout, fn) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(fn());
    }, timeout);
  })
};