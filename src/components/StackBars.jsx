import { DataSet } from 'rechart'
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
const colors = ['red', 'darkseagreen', 'blue', 'green', 'black',
  'orange', 'grey', 'darkgreen', 'darkblue',
  'greenyellow', 'blanchedalmond', 'blueviolet',
  'brown', 'burlywood', 'chocolate', 'yellow', 'darkolivegreen']
export const StackBars = ({ dataset, keyFields }) => {
  console.log('ULRIMOSOSOSO', dataset)
  const keys = Object.keys(keyFields)
  console.log(keyFields)

  return (

    <BarChart
      width={500}
      height={300}
      data={dataset}
    >
      <CartesianGrid strokeDasharray='3 3' />
      <XAxis dataKey={dataset[0].xField} />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey='Hombre' stackId='a' fill='#8884d8' />
      <Bar dataKey='Mujer' stackId='a' fill='#82ca9d' />
    </BarChart>

  )
}
