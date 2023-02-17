import * as d3 from 'd3'
import { useMemo } from 'react'
const percentage = (total, data) => {
  return Math.round(data * 100 / total)
}
const colors = ['red', 'darkseagreen', 'blue', 'green', 'black',
  'orange', 'grey', 'darkgreen', 'darkblue',
  'greenyellow', 'blanchedalmond', 'blueviolet',
  'brown', 'burlywood', 'chocolate', 'yellow', 'darkolivegreen']

const setColors = (array, xField) => {
  // const iterator = colors.entries()
  let z = 0
  const arrayWithColors = array.map((field, i) => {
    if (i !== 0) {
      console.log('izquierda', field[xField], 'derecha', array[i - 1][xField], 'ITERACION: ', i, 'la z: ', z)

      if (field[xField] !== array[i - 1][xField]) {
        z++
        console.log('entra en iteracion: ', i, 'la z: ', z)
        return (Object.assign(field, { color: colors[z] }))
      } else return (Object.assign(field, { color: colors[z] }))
    } else return (Object.assign(field, { color: colors[0] }))
  })
  // console.log('DIIIIIIIIIIIIIIIIIIIIIIIIII', arrayWithColors)
  return arrayWithColors
}

export const Chart = ({ dataset }) => {
  const [data, lenght] = dataset
  const rectsWithColors = (setColors(data, data[0].xField))
  console.log('DIIIIIIIIIIIIIIIIIIIIIIIIII', rectsWithColors)
  const width = (30) * rectsWithColors.length
  const view = `0 0 ${width} 100`

  const total = dataset[dataset.length - 1]
  return (
    <div className='grafica'>
      <h2>Grafica de mierda</h2>
      <svg viewBox='0 0 500 200'>
        <line x1='20' y1='0' x2='20' y2='176' stroke='black' />
        <text x1={0} y='176'>0</text>
        <text x1={0} y='136'>25</text>
        <text x1={0} y='92'>50</text>
        <text x1={0} y='48'>75</text>
        <line x1='18' y1='132' x2='22.5' y2='132' stroke='black' />
        <line x1='18' y1='88' x2='22.5' y2='88' stroke='black' />
        <line x1='18' y1='44' x2='22.5' y2='44' stroke='black' />

        <svg viewBox={view}>
          {
      rectsWithColors.map((dataSet, i) => {
        const altura = percentage(total, dataSet.altura)
        return (
          <rect
            height={altura}
            key={i}
            width={25}
            x={i === 0 ? 20 : i * 30}
            y={100 - altura}
            fill={dataSet.color}
          />
        )
      })
}
          {/* {
    dataset.map((dataSet, i) => {
      const altura = percentage(total, dataSet.altura)
      return (
        <text
          key={i}
          x={i * 30 + 5}
          y={100 - 3 * altura}
        >{altura}
        </text>
      )
    })
} */}
        </svg>
      </svg>
    </div>

  )
}/* const Axis = () => {
  const ticks = useMemo(() => {
    const xScale = d3.scaleLinear()
      .domain([0, 100])
      .range([10, 200])

    return xScale.ticks()
      .map(value => ({
        value,
        yOffset: y(value)
      }))
  }, [])

  return (
    <svg>
      <path
        d='M 9.5 0.5 H 290.5'
        stroke='currentColor'
      />
      {ticks.map(({ value, xOffset }) => (
        <g
          key={value}
          transform={`translate(${xOffset}, 0)`}
        >
          <line
            y2='6'
            stroke='currentColor'
          />
          <text
            key={value}
            style={{
              fontSize: '10px',
              textAnchor: 'middle',
              transform: 'translateY(20px)'
            }}
          >
            {value}
          </text>
        </g>
      ))}
    </svg>
  )
}
*/
