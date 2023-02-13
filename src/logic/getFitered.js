export function getFiltered ({ data, field, filter }) {
  const y = data?.map(element =>
    element[field]
  )
  const unique = [...new Set(y)]

  console.log('CLAVE', unique)
}
