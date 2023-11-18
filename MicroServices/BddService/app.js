//./app.js
const express = require("express");
const atob = require("atob");
const app = express();
const { GetFeaturesByOrderOfMostRecentQuery, GetScenariosByOrderOfMostRecentQuery, GetStepsByOrderOfMostRecentQuery, CreateStepCommand, queryService, CreateFeatureCommand, commandService } = require("./src/_libs");
app.use(express.json());



app.post("/api/v1/feature", (req, res) => {
  const feature = req.body;
  const prepareFeatureCommand = new CreateFeatureCommand(feature);
  // We want to allow maximum throughput so we don't wait for the write to happen before returning a response.
  wait(2000, () => {
    console.log("Placing feature", feature);
    console.log("--------------------------");
    console.log(prepareFeatureCommand)
    commandService.runCommand(prepareFeatureCommand)
  });

  res.json(feature);
});
app.get("/api/v1/features/query", async (req, res) => {
  const q = new GetFeaturesByOrderOfMostRecentQuery(JSON.parse(atob(decodeURIComponent(req.query.data))));
  console.log("Getting list features aren't dispatched");
  console.log("--------------------------");
  const feature = await queryService.runQuery(q);
  res.json(feature);
});
app.get("/api/v1/scenarios/query", async (req, res) => {
  const q = new GetScenariosByOrderOfMostRecentQuery(JSON.parse(atob(decodeURIComponent(req.query.data))));
  console.log("Getting list Scenarios aren't dispatched");
  console.log("--------------------------");
  const feature = await queryService.runQuery(q);
  res.json(feature);
});
app.get("/api/v1/steps/query", async (req, res) => {
  const q = new GetStepsByOrderOfMostRecentQuery(JSON.parse(atob(decodeURIComponent(req.query.data))));
  console.log("Getting list steps aren't dispatched");
  console.log("--------------------------");
  const feature = await queryService.runQuery(q);
  res.json(feature);
});

app.post("/api/v1/step", (req, res) => {
  const step = req.body;
  const prepareStepCommand = new CreateStepCommand(step);
  // We want to allow maximum throughput so we don't wait for the write to happen before returning a response.
  wait(2000, () => {
    console.log("Placing step", step);
    console.log("--------------------------");
    console.log(prepareFeatureCommand)
    commandService.runCommand(prepareStepCommand)
  });

  res.json(step);
});


module.exports = app;

const wait = (timeout, fn) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(fn());
    }, timeout);
  })
};
