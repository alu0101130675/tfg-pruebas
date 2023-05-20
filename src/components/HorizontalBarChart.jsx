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
  const cutSize = window.outerWidth < 600 ? 18 : 21

  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
        dy={16}
        textAnchor='end'
        fill='#666'
        style={{ fontSize: `${window.outerWidth < 600 ? '10px' : '1rem'}` }}
      >
        {payload.value.length < cutSize ? payload.value : payload.value.slice(0, cutSize - 2) + '...'}
      </text>
    </g>
  )
}

export function HorizontalBarChart ({ dataset, keyFields, stackFlag = undefined }) {
  const keys = Object.keys(keyFields)

  return (
    <ResponsiveContainer
      width='100%' aspect={window.outerWidth < 600 ? 2 / 3 : 2 / 1}
    >
      <BarChart
        data={dataset}
        layout='vertical'
        margin={{ top: 2, right: -5, bottom: 0, left: window.outerWidth < 600 ? 30 : 120 }}
      >
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis type='number' />
        <YAxis type='category' dataKey={dataset[0].xField} tick={<CustomTick />} />
        <Tooltip />
        <Legend />
        {keys.map((key, i) => <Bar key={key} stackId={stackFlag} dataKey={key} fill={COLORS[i]} />)}
      </BarChart>
    </ResponsiveContainer>

  )
}
