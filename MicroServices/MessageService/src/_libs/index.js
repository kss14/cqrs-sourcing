const GetLastMessageQuery = require("../Query/GetLastMessageQuery");
const CreateMessageCommand = require("../Command/CreateMessageCommand");
const QueryService = require("../../../_Common/tasks/QueryService");
const CommandService = require("../../../_Common/tasks/CommandService");
const GetMessagesByOrderOfMostRecentQuery = require("../Query/GetMessagesByOrderOfMostRecentQuery");

module.exports = {
  GetLastMessageQuery,
  GetMessagesByOrderOfMostRecentQuery,
  CreateMessageCommand,
  queryService: new QueryService(),
  commandService: new CommandService()
};
