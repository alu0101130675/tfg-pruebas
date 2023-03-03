import { useState } from 'react'
import { useAxeFields } from '../hooks/axesFields'
import { ChartSelector } from './ChartSelector'
import { getAxes } from '../logic/getAxes'
import { AxesSelector } from './AxesSelector'
import { FieldsSelector } from './FieldsSelector'
import { chartDate } from '../logic/chartDate'

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

  const { dataSet } = chartDate({ data, axes, gender: 'both', fields })

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
