module.exports = (step) => {
  return {
    source: "place-step",
    id: step.id,
    idRef: step.idRef,
    lang: step.lang,
    make: step.make,
    category: step.category,
    content: step.content,
    arguments: step.arguments, //argument whith this  #...#, it is an argument secure.
    code: step.arguments,
    creatAt: step.creatAt,
    createBy: step.userId,
  }
}
