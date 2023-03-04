export function getAxes ({ data, field }) {
  const y = data?.map(element =>
    [element[field], true] // los pongo todos a true si tal
  )
  const unique = [...new Set(y)]
  const filtres = Object.fromEntries(unique)
  return filtres
}
