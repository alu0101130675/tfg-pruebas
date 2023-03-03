import { useState } from 'react'
import { useAxeFields } from '../hooks/axesFields'
import { ChartSelector } from './ChartSelector'
import { getAxes } from '../logic/getAxes'
import { AxesSelector } from './AxesSelector'
import { FieldsSelector } from './FieldsSelector'
const setDataStructure = ({ xField, yField, gender, x, y }) => {
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
function mergeObjects (object1, key) {
  const merged = object1.map(element => {
    const filtered = object1.filter(d => d[key] === element[key])
    return Object.assign(...filtered)
  })
  const unique = [...new Set(merged)]
  return unique
}

function chartDates ({ data, axes, gender, fields }) {
  const { xField, yField } = axes
  const [x, y] = fields
  const objectX = setDataStructure({ xField, yField, gender, x, y })

  const aux = objectX.map((elemetX) => {
    const result = data.filter((dataElement) => {
      return elemetX[yField] === dataElement[yField] && elemetX[xField] === dataElement[xField]
    })
    const altura = result.length
    if (altura !== 0) { /// total se usa para calcular el porcentage
      const yKey = result[0][yField]

      return { ...elemetX, [yKey]: altura, xField }
    }
    return ''
  })
  const arrayWithoutZero = aux.filter(d => d !== '')
  const dataSet = mergeObjects(arrayWithoutZero, xField)
  return { dataSet }
}

export function Options ({ data, options }) {
  const [axes, setAxes] = useState({ xField: 'Comunidad Autónoma', yField: 'Sexo'/*, gender: 'both' */ })
  const [selectedFields, setSelectedFields] = useState([{
    'eje X': getAxes({ data, field: axes.xField })
  },
  { 'eje Y': getAxes({ data, field: axes.yField }) }])
  const fields = useAxeFields({ axes, filter: selectedFields })

  const handleAxechange = (e, axeFlag) => {
    const x = e.target.value
    const auxObject = {}
    auxObject[axeFlag] = x
    const newXField = Object.assign(axes, auxObject)
    setAxes(newXField)
    if (axeFlag === 'xField') {
      const [, selectedY] = selectedFields // CREO QUE LA CONT ESTA Y LA DE ABAJO SE PUEDEN AHORRAR POR [...,{}]
      const newSelectedFields = [{
        'eje X': getAxes({ data, field: newXField.xField })
      },
      selectedY]
      setSelectedFields(newSelectedFields)
    } else {
      const [selectedX] = selectedFields
      const newSelectedFields = [
        selectedX,
        {
          'eje Y': getAxes({ data, field: newXField.yField })
        }]
      setSelectedFields(newSelectedFields)
    }
  }

  const { dataSet } = chartDates({ data, axes, gender: 'both', fields })

  return (
    <>
      <div className='flex-horizontal'>
        <ChartSelector dataSet={dataSet} selectedFields={selectedFields} />
        {Object.keys(axes).map(axe =>
          (
            <AxesSelector
              key={axe}
              axes={axes}
              handleAxechange={handleAxechange}
              options={options}
              axeFlag={axe}
            />

          )
        )}

      </div>
      <FieldsSelector
        setSelectedFields={setSelectedFields}
        selectedFields={selectedFields}
      />
    </>

  )
}
