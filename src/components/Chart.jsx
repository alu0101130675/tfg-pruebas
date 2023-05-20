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
import './css/Chart.css'
const CustomTick = (props) => {
  const { x, y, payload } = props
  const dy = window.outerWidth < 700 ? 0 : 16
  const rotate = window.outerWidth < 700 ? -60 : -35

  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
        dy={dy} // 0
        textAnchor='end'
        fill='#666'
        transform={`rotate(${rotate})`}
        style={{ fontSize: `${window.outerWidth < 700 ? '10px' : '1rem'}` }}
      >
        {payload.value.length < 21 ? payload.value : payload.value.slice(0, 21 - 2) + '...'}
      </text>
    </g>
  )
}

export const Chart = ({ dataset, keyFields, stackFlag = undefined }) => {
  const keys = Object.keys(keyFields)
  const responsiveMargin = window.outerWidth < 700
    ? { top: 5, right: 0, bottom: 100, left: 0 }
    : { top: 5, right: 30, bottom: 100, left: 20 }
  return (
    <div className='chart-container'>
      <ResponsiveContainer
        width='100%' height='100%'
      >
        <BarChart
          margin={responsiveMargin}
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
    </div>

  )
}
