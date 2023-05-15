export function getAxes ({ data, field }) {
  const y = data?.map(element =>
    [element[field], true] // los pongo todos a true si tal
  )
  const filtres = Object.fromEntries(y)
  const filtersWithoutNA = Object.entries(filtres).filter(([filter]) => filter !== 'NA')
  return Object.fromEntries(filtersWithoutNA)
}
