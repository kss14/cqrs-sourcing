const GetHighestBidQuery = require("../Query/GetHighestBidQuery");
const GetBidsByOrderOfMostRecentQuery = require("../Query/GetBidsByOrderOfMostRecentQuery");
const CreateBidCommand = require("../Command/CreateBidCommand");
const QueryService = require("../../../_Common/tasks/QueryService");
const CommandService = require("../../../_Common/tasks/CommandService");

module.exports = {
  GetHighestBidQuery,
  GetBidsByOrderOfMostRecentQuery,
  CreateBidCommand,
  queryService: new QueryService(),
  commandService: new CommandService()
};
