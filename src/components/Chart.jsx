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

export const Chart = ({ dataset, keyFields, stackFlag = undefined }) => {
  const keys = Object.keys(keyFields)

  return (
    <ResponsiveContainer
      width='100%' aspect={3 / 1}
    >
      <BarChart
        data={dataset}
      >
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey={dataset[0].xField} />
        <YAxis />
        <Tooltip />
        <Legend />
        {keys.map((key, i) => <Bar key={key} stackId={stackFlag} dataKey={key} fill={COLORS[i]} />)}
      </BarChart>
    </ResponsiveContainer>

  )
}
