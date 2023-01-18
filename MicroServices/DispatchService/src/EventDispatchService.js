const EventDispatch = require("./EventDispatchModel");
const btoa = require('btoa')

class EventDispatchService {
  findLastDispatchEvent() {
    return EventDispatch.findOne({}).sort({ createdAt: "desc" });
  }

  storeLatestDispatch(lastEvent) {
    if (lastEvent) {
      new EventDispatch({ createdAt: lastEvent.createdAt }).save();
    }
  }

  findUnsentBidEvents(dispatch) {
    if (dispatch) {
      return this.buildGetFetch('http://bid:3001/api/v1/bids/query',{ createdAt: { $gt: dispatch.createdAt }})
    } else {
      return  this.buildGetFetch('http://bid:3001/api/v1/bids/query',{})
    }
  }

  findUnsentMessageEvents(dispatch) {
    if (dispatch) {
      return this.buildGetFetch('http://message:3000/api/v1/messages/query',{ createdAt: { $gt: dispatch.createdAt }})
    } else {
      return this.buildGetFetch('http://message:3000/api/v1/messages/query',{})
    }
  }

  async findAllUnsentEvents(dispatch) {
    let unsentEvents = []
    let findUnsentBidEvents =  await this.findUnsentBidEvents(dispatch)
    let findUnsentMessageEvents =  await this.findUnsentMessageEvents(dispatch)

    if(findUnsentBidEvents.length > 0) {
      findUnsentBidEvents.forEach(function(event) {
        event.collectionName = "bidevents";
      });
      unsentEvents = unsentEvents.concat(findUnsentBidEvents)
    }
    if(findUnsentMessageEvents.length > 0){
      findUnsentMessageEvents.forEach(function(event) {
        event.collectionName = "messageevents";
      });
      console.log(findUnsentMessageEvents.length,findUnsentMessageEvents)
      unsentEvents = unsentEvents.concat(findUnsentMessageEvents)
    }

    return unsentEvents
  }

  buildGetFetch(url,data, typeMethod = 'GET'){
    return fetch(url+'?'+'data='+encodeURIComponent(btoa(JSON.stringify(data))), {
      method: typeMethod,
      headers: {
        'Content-Type': 'application/json',
      }
    })
        .then(response => response.json())
        .then(data => data)
        .catch(error => console.error(url+'?'+'data='+btoa(JSON.stringify(data),error)));
  }

}

module.exports = EventDispatchService;
