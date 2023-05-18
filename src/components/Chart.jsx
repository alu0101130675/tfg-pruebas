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
const CustomTick = (props) => {
  const { x, y, payload } = props

  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
        dy={16}
        textAnchor='end'
        fill='#666'
        transform='rotate(-35)'
      >
        {payload.value.length < 21 ? payload.value : payload.value.slice(0, 19) + '...'}
      </text>
    </g>
  )
}

export const Chart = ({ dataset, keyFields, stackFlag = undefined }) => {
  const keys = Object.keys(keyFields)
  return (
    <ResponsiveContainer
      width='100%' aspect={window.outerWidth < 600 ? 1 / 1 : 3 / 1}
    >
      <BarChart
        margin={{ top: 5, right: 30, bottom: 100, left: 20 }}
        data={dataset}
      >
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey={dataset[0].xField} tick={<CustomTick />} interval={0} />
        <YAxis />
        <Tooltip />
        <Legend wrapperStyle={{ top: '90%', right: 0, textAlign: 'right' }} />
        {keys.map((key, i) => <Bar key={key} stackId={stackFlag} dataKey={key} fill={COLORS[i]} />)}
      </BarChart>
    </ResponsiveContainer>

  )
}
