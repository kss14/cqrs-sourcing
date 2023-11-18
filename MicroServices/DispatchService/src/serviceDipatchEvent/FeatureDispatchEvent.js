module.exports = (feature) => {
  return {
    source: "place-feature",
    id: feature.id,
    category: feature.category,
    lang: feature.lang,
    title: feature.title,
    description: feature.description,
    scenarios: feature.scenarios,
    createBy: feature.userId,
    createdAt: feature.createdAt
  }
}
