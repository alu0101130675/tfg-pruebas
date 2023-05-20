import { Chart } from './Chart'
import { ChartSelect } from './ChartSelect'
import { CircularChart } from './PieChart'
import './css/ChartSelector.css'
import { HorizontalBarChart } from './HorizontalBarChart'
function sortArray (dataset) {
  const sortFirstNumbersOfstring = dataset.sort((a, b) => {
    const numberA = Number(a[a.xField].split(' ', 1)[0])
    const numberB = Number(b[b.xField].split(' ', 1)[0])
    if (isNaN(numberA)) {
      console.log('entara')
      return -1
    }
    if (isNaN(numberB)) {
      return 1
    }

    return numberA - numberB
  })
  const menor = sortFirstNumbersOfstring.find(element => element[element.xField].toLowerCase().startsWith('menor'))
  const mayor = sortFirstNumbersOfstring.find(element => element[element.xField].toLowerCase().startsWith('mayor'))
  const auxArray = sortFirstNumbersOfstring.filter(element => element !== menor && element !== mayor)
  const sortedArray = [menor, ...auxArray, mayor].filter(Boolean)
  return sortedArray
}
export function ChartSelector ({
  dataSet, selectedFields, setSelectedFields, setChartSelected, chartSelected
}) {
  const sorted = sortArray(dataSet)
  return (
    <>
      {dataSet.length === 0 && <p>Seleciona como minimo un campo en cada eje</p>}
      {chartSelected === 'Gráfico de barras' && <Chart dataset={sorted} keyFields={selectedFields[1].yField} />}
      {chartSelected === 'Gráfico de barras apiladas' && <Chart dataset={sorted} stackFlag='a' keyFields={selectedFields[1].yField} />}
      {chartSelected === 'Gráfica circular' && <CircularChart dataset={sorted} keyFields={selectedFields[1].yField} />}
      {chartSelected === 'Gráfico de barras horizontal' && <HorizontalBarChart dataset={sorted} keyFields={selectedFields[1].yField} />}
      {chartSelected === 'Gráfico de barras horizontal apiladas' && <HorizontalBarChart stackFlag='a' dataset={sorted} keyFields={selectedFields[1].yField} />}

      <ChartSelect
        chartSelected={chartSelected}
        setChartSelected={setChartSelected}
        selectedFields={selectedFields}
        setSelectedFields={setSelectedFields}
      />
    </>

  )
}
