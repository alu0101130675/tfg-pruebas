export function FieldsSelector ({ selectedFields, setSelectedFields }) {
  const handleChange = (e) => {
    const axe = e.target.name
    const field = e.target.value
    const vectorAxesPosition = axe === 'eje X' ? 0 : 1
    const newFields = [...selectedFields]
    newFields[vectorAxesPosition][axe][field] = !selectedFields[vectorAxesPosition][axe][field]
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
              {stringKeys.map((key, i) => {
                const column = i % 2 === 0 ? 1 : 2
                return (
                  <label key={key} style={{ gridColumn: column }}>
                    <input name={axe} type='checkbox' defaultChecked='true' value={key} onChange={handleChange} />
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
