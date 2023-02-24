import { ToolTips } from 'rechart'
import { ResponsiveContainer, PieChart, Pie, Legend, Cell, LabelList } from 'recharts'
const COLORS = ['red', 'darkseagreen', 'blue', 'green', 'black',
  'orange', 'grey', 'darkgreen', 'darkblue',
  'greenyellow', 'blanchedalmond', 'blueviolet',
  'brown', 'burlywood', 'chocolate', 'yellow', 'darkolivegreen']
// HACER INTERFAZ PARA LA DE QUESO COMPLETA PORQUE LOS CAMPOS SOLO PUEDEN SER DOS
export const CircularChart = ({ dataset, keyFields }) => {
  const keys = Object.keys(keyFields)
  console.log(keyFields)
  /* const data = [
    { otro: 'otro', name: 'Group A', value: 400 },
    { otro: 'otro', name: 'Group B', value: 300 },
    { otro: 'otro', name: 'Group C', value: 300 },
    { otro: 'otro', name: 'Group D', value: 200 }
  ] */
  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie nameKey='Comunidad Autónoma' dataKey='Hombre' data={dataset} fill='#8884d8'>
            {dataset.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}>
                <text>algo</text>
              </Cell>
            ))}
            <LabelList dataKey='Comunidad Autónoma' position='insideTop' />

          </Pie>
          <Legend />
          <ToolTips />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
