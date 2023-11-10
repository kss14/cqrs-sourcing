const { featureEventTypes } = require("./events");

module.exports = (event, view) => {
  switch (event.type) {
    case featureEventTypes.createStep:
      if (event.id === view.id) {
        // Créez un nouveau step et ajoutez-le à la liste des steps
        const newStep = {
          lang: event.lang,
          make: event.make,
          category: event.category,
          content: event.content,
          arguments: event.arguments,
        };
        return {
          ...view,
          steps: [...view.steps, newStep],
        };
      }
      return view;

    case featureEventTypes.updateStep:
      if (event.id === view.id) {
        // Recherchez le step à mettre à jour dans la liste
        const updatedSteps = view.steps.map((step) => {
          if (step.id === event.stepId) {
            return {
              ...step,
              lang: event.lang,
              make: event.make,
              category: event.category,
              content: event.content,
              arguments: event.arguments,
            };
          }
          return step;
        });
        return {
          ...view,
          steps: updatedSteps,
        };
      }
      return view;

    case featureEventTypes.removeStep:
      if (event.id === view.id) {
        // Supprimez le step correspondant par son ID
        const updatedSteps = view.steps.filter((step) => step.id !== event.stepId);
        return {
          ...view,
          steps: updatedSteps,
        };
      }
      return view;

    case featureEventTypes.addStep:
      if (event.id === view.id) {
        // Créez un nouveau step et ajoutez-le à la liste des steps
        const newStep = {
          cloneId: event.cloneId,
          lang: event.lang,
          make: event.make,
          category: event.category,
          content: event.content,
          arguments: event.arguments,
        };
        return {
          ...view,
          steps: [...view.steps, newStep],
        };
      }
      return view;

    case featureEventTypes.createScenario:
      if (event.id === view.id) {
        // Créez un nouveau scénario et ajoutez-le à la liste des scénarios
        const newScenario = {
          lang: event.lang,
          title: event.title,
          tags: event.tags,
          steps: event.steps,
        };
        return {
          ...view,
          scenarios: [...view.scenarios, newScenario],
        };
      }
      return view;

    case featureEventTypes.updateScenario:
      if (event.id === view.id) {
        // Recherchez le scénario à mettre à jour dans la liste
        const updatedScenarios = view.scenarios.map((scenario) => {
          if (scenario.id === event.scenarioId) {
            return {
              ...scenario,
              lang: event.lang,
              title: event.title,
              tags: event.tags,
              steps: event.steps
            };
          }
          return scenario;
        });
        return {
          ...view,
          scenarios: updatedScenarios,
        };
      }
      return view;

    case featureEventTypes.removeScenario:
      if (event.id === view.id) {
        // Supprimez le scénario correspondant par son ID
        const updatedScenarios = view.scenarios.filter(
          (scenario) => scenario.id !== event.scenarioId
        );
        return {
          ...view,
          scenarios: updatedScenarios,
        };
      }
      return view;

    case featureEventTypes.addScenario:
      if (event.id === view.id) {
        // Créez un nouveau scénario et ajoutez-le à la liste des scénarios
        const newScenario = {
          lang: event.lang,
          title: event.title,
          tags: event.tags,
          steps: event.steps,
        };
        return {
          ...view,
          scenarios: [...view.scenarios, newScenario],
        };
      }
      return view;

    case featureEventTypes.createFeature:
      // Créez une nouvelle fonctionnalité
      const newFeature = {
        id: event.id,
        category: event.category,
        lang: event.lang,
        title: event.title,
        description: event.description,
        scenarios: event.scenarios,
      };
      return newFeature;

    case featureEventTypes.updateFeature:
      if (event.id === view.id) {
        // Mise à jour de la fonctionnalité
        return {
          ...view,
          id: event.id,
          category: event.category,
          lang: event.lang,
          title: event.title,
          description: event.description,
        };
      }
      return view;

    case featureEventTypes.removeFeature:
      if (event.id === view.id) {
        // La fonctionnalité est supprimée
        return null;
      }
      return view;

    default:
      return view;
  }
};
