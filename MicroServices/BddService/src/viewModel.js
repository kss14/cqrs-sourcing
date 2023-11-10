const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const stepSchema = new Schema({
  id: String,
  cloneId: String | null,
  lang: String,
  make: String,
  category: String,
  content: String,
  arguments: [String | null],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  createdBy: String,
  updatedBy: String,
});

const scenarioSchema = new Schema({
  id: String,
  lang: String,
  title: String,
  tags: [String | null],
  steps: [stepSchema],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  createdBy: String,
  updatedBy: String,
});

const featureSchema = new Schema({
  id: String,
  category: String,
  lang: String,
  title: String,
  description: String,
  scenarios: [scenarioSchema],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  createdBy: String,
  updatedBy: String,
});

module.exports = {
  StepModel: mongoose.model("StepView", stepSchema),
  ScenarioModel: mongoose.model("ScenarioView", scenarioSchema),
  FeatureModel: mongoose.model("FeatureView", featureSchema),
};
