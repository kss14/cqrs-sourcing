const {BidEventModel} = require("./events");
const BidViewModel = require("./viewModel");
const BidReducer = require("./reducer");

module.exports = async function BidEventStore(events,eventCurrent) {
    await BidEventModel({eventData: eventCurrent}).save();
    const viewInDb = await BidViewModel.findOne({id: eventCurrent.id});
    const reducers = [BidReducer]

    if (viewInDb) {
        const acc = {
            id: viewInDb.id,
            amount: viewInDb.amount,
            currency: viewInDb.currency,
            createdAt: viewInDb.createdAt
        };
        const view = reducers.reduce((view, reducer) => reducer(eventCurrent, view), acc);
        viewInDb.id = view.id;
        viewInDb.amount = view.amount;
        viewInDb.currency = view.currency;
        viewInDb.createdAt = view.createdAt;
        await viewInDb.save();
    } else {
        const view = reducers.reduce((view, reducer) => reducer(eventCurrent, view), {});
        await new BidViewModel(view).save();
    }

    const lastEvent = events[events.length - 1];

    return await BidViewModel.findOne({id: lastEvent.id});
}