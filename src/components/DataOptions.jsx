import { axeFields } from '../hooks/axesFields'
import { ChartSelector } from './ChartSelector'
import { FieldsSelector } from './FieldsSelector'
import { chartDate } from '../logic/chartDate'
import './css/DataOptions.css'
import { useDataSet } from '../hooks/getData'
import { useLocation } from 'react-router'
import { Loader } from './Loader'
import { useChart } from '../hooks/useChart'
import { GearButton } from './GearButton'
import { useTrigger } from '../hooks/useTrigger'

export function Options () {
  const { pathname } = useLocation()
  const { data, options, selectedFields, setSelectedFields, setAxes, axes, weight } = useDataSet({ pathname })
  const { chartSelected, setChartSelected, dataDescription, chartDescription } = useChart({ pathname, selectedFields: [axes?.xField, axes?.yField], axes })
  const [showFieldSelector, setShowFieldSelector] = useTrigger(false)
  if (!data) return <Loader />
  const fields = axeFields({ axes, filter: selectedFields })
  const { dataSet } = chartDate({ data, axes, gender: 'both', fields, weight })

  return (
    <>
      <h1 className='page-title'>{pathname.substring(1, pathname.length)}</h1>
      {dataDescription && <p>{dataDescription}</p>}
      <h2 className='title-chart'>{chartDescription || `${axes.xField} - ${axes.yField}`} </h2>
      <GearButton setShowFieldSelector={setShowFieldSelector} showFieldSelector={showFieldSelector}>
        {showFieldSelector &&
          <div className='selector-section'>
            <FieldsSelector
              setSelectedFields={setSelectedFields}
              selectedFields={selectedFields}
              chartSelected={chartSelected}
              options={options}
              axes={axes}
              setAxes={setAxes}
              data={data}
            />
          </div>}
      </GearButton>
      <div className='flex-horizontal'>
        {dataSet.length === 0
          ? <h1 className='error'> Seleccione como minimo un campo</h1>
          : <ChartSelector
              dataSet={dataSet}
              selectedFields={selectedFields}
              setSelectedFields={setSelectedFields}
              setChartSelected={setChartSelected}
              chartSelected={chartSelected}
            />}
      </div>
    </>
  )
}
