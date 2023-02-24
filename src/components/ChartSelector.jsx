import { useState } from 'react'
import { Chart } from './chart'
import { CircularChart } from './PieChart'
const CHARTOPTIONS = ['Gráfico de barras', 'Gráfico de barras apiladas', 'Gráfica circular']
export function ChartSelector ({ dataSet, selectedFields }) {
  const [chartSelected, setChartSelected] = useState('Gráfico de barras')
  return (
    <>
      {dataSet.length === 0
        ? <p>Seleciona como minimo un campo en cada eje</p>
        : chartSelected === 'Gráfico de barras'
          ? <Chart className='grafica' dataset={dataSet} keyFields={selectedFields[1]['eje Y']} />
          : chartSelected === 'Gráfico de barras apiladas'
            ? <Chart className='grafica' dataset={dataSet} stackFlag='a' keyFields={selectedFields[1]['eje Y']} />
            : <CircularChart className='grafica' dataset={dataSet} keyFields={selectedFields[1]['eje Y']} />}
      <label>
        Seleccione tipo de grafica:
        <select
          name='grafica' id='grafica' value={chartSelected} onChange={(e) => {
            setChartSelected(e.target.value)
          }}
        >
          {CHARTOPTIONS.map((value) => {
            return (<option key={value} value={value}>{value}</option>
            )
          })}
        </select>
      </label>
    </>

  )
}
