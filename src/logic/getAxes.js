export function getAxes ({ data, field }) {
  const y = data?.map(element =>
    [element[field], true]
  )
  const unique = [...new Set(y)]
  const filtres = Object.fromEntries(unique)
  return filtres
}
