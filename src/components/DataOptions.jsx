import { useState } from 'react'
import { useAxeFields } from '../hooks/axesFields'
import { ChartSelector } from './ChartSelector'
import { getAxes } from '../logic/getAxes'
import { FieldsSelector } from './FieldsSelector'
import { chartDate } from '../logic/chartDate'
import '../DataOptions.css'

export function Options ({ data, options }) {
  const [axes, setAxes] = useState({ xField: 'Comunidad Autónoma', yField: 'Sexo' })
  const [selectedFields, setSelectedFields] = useState([{
    xField: getAxes({ data, field: axes.xField })
  },
  { yField: getAxes({ data, field: axes.yField }) }])
  const [chartSelected, setChartSelected] = useState('Gráfico de barras')

  const fields = useAxeFields({ axes, filter: selectedFields })
  console.log(fields)
  const { dataSet } = chartDate({ data, axes, gender: 'both', fields })

  return (
    <>
      <h2>{axes.xField} - {axes.yField} </h2>
      <div className='flex-horizontal'>
        <ChartSelector
          dataSet={dataSet}
          selectedFields={selectedFields}
          setSelectedFields={setSelectedFields}
          setChartSelected={setChartSelected}
          chartSelected={chartSelected}
        />

      </div>

      <FieldsSelector
        setSelectedFields={setSelectedFields}
        selectedFields={selectedFields}
        chartSelected={chartSelected}
        options={options}
        axes={axes}
        setAxes={setAxes}
        data={data}

      />
    </>

  )
}
