export const Chart = ({ dataset }) => {
  const array = []
  array.map(() => {
    return 5
  })
  return (
    <div className='grafica'>
      <h2>Grafica de mierda</h2>
      <svg width={500} height={100}>
        {
      dataset.map((dataSet, i) => {
        return (
          <rect
            height={dataSet.altura}
            key={i}
            width={25}
            x={i * 30}
            y={100 - dataSet.altura}
          />
        )
      })
}
        {
    dataset.map((dataSet, i) => {
      return (
        <text
          key={i}
          x={i * 30 + 5}
          y={100 - 3 * dataSet.altura}
        >{dataSet.altura}
        </text>
      )
    })
}
      </svg>
    </div>

  )
}
