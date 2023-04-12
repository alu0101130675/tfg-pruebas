import { ResponsiveContainer, PieChart, Pie, Legend, Cell, LabelList, Tooltip } from 'recharts'
import { COLORS } from '../consts'
export const CircularChart = ({ dataset, keyFields }) => {
  const value = Object.entries(keyFields).find(([key, value]) => value) // devuelve [clave,true]
  return (
    <ResponsiveContainer width='100%' aspect={window.outerWidth < 600 ? 1 / 1 : 4 / 2}>
      <PieChart>
        <Pie nameKey={dataset[0].xField} dataKey={value[0]} data={dataset} fill='#8884d8'>
          {dataset.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
          <LabelList dataKey={value[0]} position='outside' stroke='black' fill='black' />
        </Pie>
        <Legend />
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  )
}
