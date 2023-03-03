export function mergeObjects (object1, key) {
  const merged = object1.map(element => {
    const filtered = object1.filter(d => d[key] === element[key])
    return Object.assign(...filtered)
  })
  const unique = [...new Set(merged)]
  return unique
}
