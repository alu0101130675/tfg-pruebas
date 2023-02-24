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
export const Chart = ({ dataset, keyFields, stackFlag = undefined }) => {
  console.log('ULRIMOSOSOSO', dataset)
  const keys = Object.keys(keyFields)
  console.log(keyFields)
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
        {keys.map((key, i) => <Bar key={key} stackId={stackFlag} dataKey={key} fill={colors[i]} />)}
      </BarChart>
    </ResponsiveContainer>

  )
}
