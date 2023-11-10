const GetFeatureQuery = require("../Query/GetFeatureQuery");
const GetFeaturesQuery = require("../Query/GetFeaturesQuery");
const GetScenariosQuery = require("../Query/GetScenariosQuery");
const GetTagsQuery = require("../Query/GetTagsQuery");
const CreateFeatureCommand = require("../Command/CreateFeatureCommand");
const CreateScenarioCommand = require("../Command/CreateScenarioCommand");
const CreateStepCommand = require("../Command/CreateStepCommand");
const UpdateFeatureCommand = require("../Command/UpdateFeatureCommand");
const UpdateScenarioCommand = require("../Command/UpdateScenarioCommand");
const UpdateStepCommand = require("../Command/UpdateStepCommand");
const QueryService = require("../../../_Common/tasks/QueryService");
const CommandService = require("../../../_Common/tasks/CommandService");

module.exports = {
  GetFeatureQuery,
  GetFeaturesQuery,
  GetScenariosQuery,
  GetTagsQuery,
  CreateFeatureCommand,
  CreateScenarioCommand,
  CreateStepCommand,
  UpdateFeatureCommand,
  UpdateScenarioCommand,
  UpdateStepCommand,
  queryService: new QueryService(),
  commandService: new CommandService(),
};