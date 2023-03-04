import { ToolTips } from 'rechart'
import { ResponsiveContainer, PieChart, Pie, Legend, Cell, LabelList } from 'recharts'
import { COLORS } from '../consts'
// HACER INTERFAZ PARA LA DE QUESO COMPLETA PORQUE LOS CAMPOS SOLO PUEDEN SER DOS
export const CircularChart = ({ dataset, keyFields }) => {
  const value = Object.entries(keyFields).find(([key, value]) => value) // devuelve [clave,true]
  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie nameKey={dataset[0].xField} dataKey={value[0]} data={dataset} fill='#8884d8'>
            {dataset.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
            <LabelList dataKey={value[0]} position='insideTop' />

          </Pie>
          <Legend />
          <ToolTips />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
