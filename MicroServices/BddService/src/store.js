const {
    FeatureEventModel,
    ScenarioEventModel,
    StepEventModel,
  } = require("./events");
  const { FeatureModel, ScenarioModel, StepModel } = require("./viewModel");
  const reducer = require("./reducer");
  
  const eventToModelMap = {
    CreateFeature: FeatureModel,
    UpdateFeature: FeatureModel,
    RemoveFeature: FeatureModel,
    CreateScenario: ScenarioModel,
    UpdateScenario: ScenarioModel,
    RemoveScenario: ScenarioModel,
    AddScenario: ScenarioModel,
    CreateStep: StepModel,
    UpdateStep: StepModel,
    RemoveStep: StepModel,
    AddStep: StepModel,
  };
  
  module.exports = async function EventStore(events, eventCurrent) {
    if(eventCurrent.type.indexOf("Feature") !== -1){
        await FeatureEventModel({eventData: eventCurrent}).save();
    }

    if(eventCurrent.type.indexOf("Scenario") !== -1){
        await ScenarioEventModel({eventData: eventCurrent}).save();
    }

    if(eventCurrent.type.indexOf("Step") !== -1){
        await StepEventModel({eventData: eventCurrent}).save();
    }

    const eventModel = eventToModelMap[eventCurrent.type];
  
    if (!eventModel) {
      throw new Error("Type d'événement inconnu");
    }
  
    if (eventCurrent.type === "UpdateFeature" || eventCurrent.type === "UpdateScenario" || eventCurrent.type === "UpdateStep") {
      // Pour les événements de mise à jour, cherchez l'entité par ID
      const viewInDb = await eventModel.findOne({ id: eventCurrent.id });
      if (!viewInDb) {
        throw new Error(`Impossible de trouver l'entité avec l'ID ${eventCurrent.id}`);
      }
  
      const view = reducer(eventCurrent, viewInDb);
      viewInDb.set(view); // Met à jour l'entité existante
  
      await viewInDb.save();
    } else if (eventCurrent.type === "RemoveFeature" || eventCurrent.type === "RemoveScenario" || eventCurrent.type === "RemoveStep") {
      // Pour les événements de suppression, cherchez et supprimez l'entité par ID
      const viewInDb = await eventModel.findOne({ id: eventCurrent.id });
      if (!viewInDb) {
        throw new Error(`Impossible de trouver l'entité avec l'ID ${eventCurrent.id}`);
      }
  
      await viewInDb.remove();
    } else {
      // Pour les autres événements, créez simplement une nouvelle entité
      const view = reducers.reduce((view, reducer) => reducer(eventCurrent, view), {});
      await eventModel(view).save();
    }
  
    const lastEvent = events[events.length - 1];
  
    return await eventModel.findOne({ id: lastEvent.id });
  };
  