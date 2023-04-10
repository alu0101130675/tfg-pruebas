import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend

} from 'recharts'
import { COLORS } from '../consts'
export function HorizontalBarChart ({ dataset, keyFields, stackFlag = undefined }) {
  const keys = Object.keys(keyFields)
  return (
    <ResponsiveContainer
      width='100%' aspect={window.outerWidth < 600 ? 1 / 1 : 2 / 1}
    >
      <BarChart
        data={dataset}
        layout='vertical'
      >
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis type='number' />
        <YAxis type='category' dataKey={dataset[0].xField} tickFormatter={(valie) => valie.substring(0, 5) + '...'} />
        <Tooltip />
        <Legend />
        {keys.map((key, i) => <Bar key={key} stackId={stackFlag} dataKey={key} fill={COLORS[i]} />)}
      </BarChart>
    </ResponsiveContainer>

  )
}
