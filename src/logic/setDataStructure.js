export const setDataStructure = ({ xField, yField, gender, x, y }) => {
  function objectCreation () {
    const requestedRows = x.map(elementX => {
      return y.map(elementY => {
        return (Object.fromEntries([[xField, elementX], [yField, elementY]]))
      })
    })
    const flatRows = requestedRows.flat(1)

    const rowsFiltered = gender === 'both' ? flatRows : flatRows.filter((dataRow) => { return gender === dataRow.Sexo })
    return rowsFiltered
  }

  return objectCreation()
}
