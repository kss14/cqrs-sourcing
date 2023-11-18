//src/events.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EventSchema = new Schema({
  eventData: Object,
  createdAt: { type: Date, default: Date.now },
});
module.exports.FeatureEventModel = mongoose.model("FeatureEvent", EventSchema);
module.exports.ScenarioEventModel = mongoose.model("ScenarioEvent", EventSchema);
module.exports.StepEventModel = mongoose.model("StepEvent", EventSchema);

const eventTypes = {
  createFeature: "CreateFeature",
  createScenario: "CreateScenario",
  createSteps: "CreateStep",
};

module.exports.featureEventTypes = eventTypes;

module.exports.CreateFeature = (id, feature) => {
  return {
    type: eventTypes.createFeature,
    id,
    category: feature.category,
    lang: feature.lang,
    title: feature.title,
    description: feature.description,
    scenarios: feature.scenarios,
    createBy: feature.userId,
    updateBy: feature.userId
  };
};

module.exports.CreateScenario = (id, scenario) => {
  return {
    type: eventTypes.createScenario,
    id,
    lang: scenario.lang,
    title: scenario.title,
    tags: scenario.tags,
    steps: scenario.steps,
    createBy: scenario.userId,
    updateBy: scenario.userId
  };
};

module.exports.CreateStep = (id, step) => {
  return {
    type: eventTypes.createStep,
    id,
    idRef: step.idRef,
    lang: step.lang,
    make: step.make,
    category: step.category,
    content: step.content,
    arguments: step.arguments, //argument whith this  #...#, it is an argument secure.
    code: step.arguments,
    updateAt: null,
    createBy: step.userId,
    updateBy: null
  };
};
