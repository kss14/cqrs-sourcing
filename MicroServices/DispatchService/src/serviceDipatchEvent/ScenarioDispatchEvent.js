module.exports = (scenario) => {
  return {
    source: "place-scenario",
    id: scenario.id,
    lang: scenario.lang,
    title: scenario.title,
    tags: scenario.tags,
    steps: scenario.steps,
    createBy: scenario.userId,
    createdAt: message.createdAt
  }
}
