const MessageViewModel = require("./viewModel");
const {MessageEventModel} = require("./events");
const MessageReducer = require("./reducer");

module.exports = async function storeMessageEvent(events,eventCurrent) {
    await MessageEventModel({eventData: eventCurrent}).save();
    const viewInDb = await MessageEventModel.findOne({id: eventCurrent.id});
    const reducers = [MessageReducer]
    if (viewInDb) {
        const acc = {
            id: viewInDb.id,
            msg: viewInDb.msg,
            createdAt: viewInDb.createdAt
        };
        const view = reducers.reduce((view, reducer) => reducer(eventCurrent, view), acc);
        viewInDb.id = view.id;
        viewInDb.msg = view.msg;
        viewInDb.createdAt = view.createdAt;

        await viewInDb.save();

    } else {
        const view = reducers.reduce((view, reducer) => reducer(eventCurrent, view), {});
        await new MessageViewModel(view).save();
    }

    const lastEvent = events[events.length - 1];

    return await MessageViewModel.findOne({id: lastEvent.id});
}