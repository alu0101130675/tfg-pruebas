import * as d3 from 'd3'
import { useEffect, useState } from 'react'
import { getAxes } from '../logic/getAxes'
export function useDataSet ({ pathname }) {
  const [data, setData] = useState()
  const [options, setOptions] = useState()
  const [axes, setAxes] = useState({ xField: 'Comunidad Autónoma', yField: 'Sexo' })
  const [selectedFields, setSelectedFields] = useState()
  useEffect(() => {
    try {
      d3.csv('./src/assets/example.csv')
        .then(data => {
          setData(data)
          const options = data[0] ? Object.getOwnPropertyNames(data[0]) : null
          setOptions(options)
          console.log('entra;', options[0])

          setAxes({ xField: options[0], yField: options[1] })
          console.log('axes', axes)
          setSelectedFields([{
            xField: getAxes({ data, field: options[0] })
          },
          { yField: getAxes({ data, field: options[1] }) }])
        })
    } catch (error) {
      throw (Error('Cannot read data'))
    }
  }, [])
  return { data, options, selectedFields, setSelectedFields, setAxes, axes }
}
