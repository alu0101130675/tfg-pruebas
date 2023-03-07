import { CHARTOPTIONS } from '../consts'
export function ChartSelect ({ chartSelected, setChartSelected, selectedFields, setSelectedFields }) {
  return (
    <label>
      Seleccione tipo de grafica:
      <select
        name='grafica' id='grafica' value={chartSelected} onChange={(e) => {
          const newChartSelected = e.target.value
          if (newChartSelected === 'Gráfica circular') {
            const newSelectedFields = Object.keys(selectedFields[1].yField).map((key, i) => {
              if (i === 0) {
                return [key, true]
              }
              return [key, false]
            })
            const [xAxe] = selectedFields
            const newFields = Object.fromEntries(newSelectedFields)
            setSelectedFields([xAxe, { yField: newFields }])
          }
          setChartSelected(newChartSelected)
        }}
      >
        {CHARTOPTIONS.map((value) => {
          return (<option key={value} value={value}>{value}</option>
          )
        })}
      </select>
    </label>
  )
}
