//./app.js
const express = require("express");
const atob = require("atob");
const app = express();
const { GetFeaturesQuery,GetFeatureQuery, GetTagsQuery,GetScenariosQuery, CreateStepCommand, queryService, CreateFeatureCommand, commandService } = require("./src/_libs");
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

module.exports = app;

const wait = (timeout, fn) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(fn());
    }, timeout);
  })
};