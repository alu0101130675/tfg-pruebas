export function getFiltered ({ filter }) {
  const fields = filter[Object.keys(filter)[0]]
  const trueKeys = []
  for (const key in fields) {
    if (fields[key]) {
      trueKeys.push(key)
    }
  }
  return trueKeys
}
