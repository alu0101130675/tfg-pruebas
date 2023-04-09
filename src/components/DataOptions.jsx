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
  const { data, options, selectedFields, setSelectedFields, setAxes, axes } = useDataSet({ pathname })
  const { chartSelected, setChartSelected } = useChart({ pathname, selectedFields: [axes?.xField, axes?.yField], axes })
  const [showFieldSelector, setShowFieldSelector] = useTrigger(false)
  if (!data) return <Loader />
  const fields = axeFields({ axes, filter: selectedFields })
  const { dataSet } = chartDate({ data, axes, gender: 'both', fields })

  return (
    <>
      <h1 className='page-title'>{pathname}</h1>
      <h2 className='title-chart'>{axes.xField} - {axes.yField} </h2>
      <GearButton setShowFieldSelector={setShowFieldSelector}>
        {showFieldSelector && <FieldsSelector
          setSelectedFields={setSelectedFields}
          selectedFields={selectedFields}
          chartSelected={chartSelected}
          options={options}
          axes={axes}
          setAxes={setAxes}
          data={data}
                              />}
      </GearButton>
      <div className='flex-horizontal'>
        <ChartSelector
          dataSet={dataSet}
          selectedFields={selectedFields}
          setSelectedFields={setSelectedFields}
          setChartSelected={setChartSelected}
          chartSelected={chartSelected}
        />
      </div>

    </>
  )
}
