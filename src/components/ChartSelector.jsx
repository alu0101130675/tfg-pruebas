import { Chart } from './Chart'
import { ChartSelect } from './ChartSelect'
import { CircularChart } from './PieChart'
import '../ChartSelector.css'
import { HorizontalBarChart } from './HorizontalBarChart'
export function ChartSelector ({
  dataSet, selectedFields, setSelectedFields, setChartSelected, chartSelected
}) {
  console.log(dataSet)
  return (
    <>
      {dataSet.length === 0 && <p>Seleciona como minimo un campo en cada eje</p>}
      {chartSelected === 'Gráfico de barras' && <Chart dataset={dataSet} keyFields={selectedFields[1].yField} />}
      {chartSelected === 'Gráfico de barras apiladas' && <Chart dataset={dataSet} stackFlag='a' keyFields={selectedFields[1].yField} />}
      {chartSelected === 'Gráfica circular' && <CircularChart dataset={dataSet} keyFields={selectedFields[1].yField} />}
      {chartSelected === 'Gráfico de barras horizontal' && <HorizontalBarChart dataset={dataSet} keyFields={selectedFields[1].yField} />}

      <ChartSelect
        chartSelected={chartSelected}
        setChartSelected={setChartSelected}
        selectedFields={selectedFields}
        setSelectedFields={setSelectedFields}
      />
    </>

  )
}
