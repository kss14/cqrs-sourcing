let viewModel = null
let eventModel = null
let storeEvent = null

try {
    viewModel = require("../../MessageService/src/viewModel");
    const {MessageEventModel} = require("../../MessageService/src/events");
    eventModel = MessageEventModel
    storeEvent = require("../../MessageService/src/store")
} catch (e) {
}

try {
    viewModel = require("../../BidService/src/viewModel");
    const {BidEventModel} = require("../../BidService/src/events");
    eventModel = BidEventModel
    storeEvent = require("../../BidService/src/store")
} catch (e) {
}

class StoreService {
    async store(events) {
        let endView

        for (const event of events) {
            endView = await storeEvent(events, event)
        }

        return endView;
    }

    getHighestBidView() {
        return viewModel.findOne({}).sort({"amount": "desc"});
    }

    getBidsByOrderOfMostRecentView(options) {
        console.log(['bids', options])
        return eventModel.find(options);
    }

    getLastMessageView() {
        return viewModel.findOne({}).sort({"createAt": "desc"});
    }

    getMessagesByOrderOfMostRecentView(options) {
        console.log(['messages', options])
        return eventModel.find(options);
    }
}

module.exports = StoreService;
