import '../FieldsSelector.css'
export function FieldsSelector ({ selectedFields, setSelectedFields, chartSelected }) {
  const handleChange = (e) => {
    const axe = e.target.name
    const field = e.target.value
    const vectorAxesPosition = axe === 'eje X' ? 0 : 1
    const newFields = [...selectedFields]
    const newFieldObject = newFields[vectorAxesPosition][axe]

    if (chartSelected === 'Gráfica circular' && axe !== 'eje X') { // PONE TODAS A FALSE Y DEPSUES PONGO A TRUE LA SELECCIONADA SI ES CIRCULAR
      for (const key in newFieldObject) {
        newFieldObject[key] = false
      }
    }
    newFieldObject[field] = !selectedFields[vectorAxesPosition][axe][field]
    setSelectedFields(newFields)
  }

  return (
    <div className='selector-section'>
      {selectedFields.map((field, i) => {
        const axe = Object.keys(field)[0]
        const stringKeys = Object.keys(field[axe])
        return (
          <div key={i} className='divider-margin'>
            <h3>{axe}</h3>
            <div className='select-space'>
              {stringKeys.map((key, j) => {
                const column = j % 2 === 0 ? 1 : 2
                const selectField = field[axe][key] // valor si es true o false
                return (
                  <label key={key} style={{ gridColumn: column }}>
                    <input name={axe} type='checkbox' checked={selectField} value={key} onChange={handleChange} />
                    {key}
                  </label>
                )
              }
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
