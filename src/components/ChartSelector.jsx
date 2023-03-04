import { Chart } from './Chart'
import { ChartSelect } from './ChartSelect'
import { CircularChart } from './PieChart'
import '../ChartSelector.css'
export function ChartSelector ({
  dataSet, selectedFields, setSelectedFields, setChartSelected, chartSelected
}) {
  return (
    <>
      {dataSet.length === 0
        ? <p>Seleciona como minimo un campo en cada eje</p>
        : chartSelected === 'Gráfico de barras'
          ? <Chart className='grafica' dataset={dataSet} keyFields={selectedFields[1]['eje Y']} />
          : chartSelected === 'Gráfico de barras apiladas'
            ? <Chart className='grafica' dataset={dataSet} stackFlag='a' keyFields={selectedFields[1]['eje Y']} />
            : <CircularChart className='grafica' dataset={dataSet} keyFields={selectedFields[1]['eje Y']} />}
      <ChartSelect
        chartSelected={chartSelected}
        setChartSelected={setChartSelected}
        selectedFields={selectedFields}
        setSelectedFields={setSelectedFields}
      />

    </>

  )
}
