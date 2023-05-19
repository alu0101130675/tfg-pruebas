import './css/FieldsSelector.css'
import { AxesSelector } from './AxesSelector'
import { getAxes } from '../logic/getAxes'
export function FieldsSelector (
  {
    selectedFields,
    setSelectedFields,
    chartSelected,
    data,
    setAxes,
    axes,
    setIsInsideChildren,
    options
  }) {
  const handleChange = (e) => {
    const axe = e.target.name
    const field = e.target.value
    const vectorAxesPosition = axe === 'xField' ? 0 : 1
    const newFields = [...selectedFields]
    const newFieldObject = newFields[vectorAxesPosition][axe]

    if (chartSelected === 'Gráfica circular' && axe !== 'xField') { // PONE TODAS A FALSE Y DEPSUES PONGO A TRUE LA SELECCIONADA SI ES CIRCULAR
      for (const key in newFieldObject) {
        newFieldObject[key] = false
      }
    }
    newFieldObject[field] = !selectedFields[vectorAxesPosition][axe][field]
    setSelectedFields(newFields)
  }
  const handleAxechange = (e, axeFlag) => {
    const x = e.target.value
    if (x === axes.xField || x === axes.yField) {
      return
    }
    const auxObject = {}
    auxObject[axeFlag] = x
    const newXField = Object.assign({}, axes, auxObject)
    setAxes(newXField)
    if (axeFlag === 'xField') {
      const [, selectedY] = selectedFields // CREO QUE LA CONT ESTA Y LA DE ABAJO SE PUEDEN AHORRAR POR [...,{}]
      const newSelectedFields = [{
        xField: getAxes({ data, field: newXField.xField })
      },
      selectedY]
      setSelectedFields(newSelectedFields)
    } else {
      const [selectedX] = selectedFields
      const newSelectedFields = [
        selectedX,
        {
          yField: getAxes({ data, field: newXField.yField })
        }]
      if (chartSelected === 'Gráfica circular') {
        const nuevos = Object.keys(newSelectedFields[1].yField).map((key, i) => {
          if (i === 0) {
            return [key, true]
          }
          return [key, false]
        })
        const [xAxe] = selectedFields
        const newFields = Object.fromEntries(nuevos)
        setSelectedFields([xAxe, { yField: newFields }])
      } else { setSelectedFields(newSelectedFields) }
    }
  }

  return (
    <div className='selector-section' onMouseEnter={setIsInsideChildren()} onMouseLeave={setIsInsideChildren()}>
      {selectedFields.map((field, i) => {
        const axe = Object.keys(field)[0]
        const stringKeys = Object.keys(field[axe])
        return (
          <div key={i} className='divider-margin'>

            <AxesSelector
              key={axe}
              axes={axes}
              handleAxechange={handleAxechange}
              options={options}
              axeFlag={axe}
            />

            <div className='select-space'>
              {stringKeys.map((key, j) => {
                const column = j % 2 === 0 ? 1 : 2
                const selectField = field[axe][key] // valor si es true o false
                return (
                  <label className='field' key={key} style={{ gridColumn: column }}>
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
