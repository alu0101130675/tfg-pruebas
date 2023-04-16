/**
 *
 * @param {x} clave de eje x sin repetir por ejemplo 31 a 65 años, mayor de 60...
 * y: su homologo
 * @returns
 */
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
