import * as d3 from 'd3'
import { useEffect, useState } from 'react'

export function useDataSet () {
  const [data, setData] = useState()
  const [options, setOptions] = useState()

  useEffect(() => {
    try {
      d3.csv('./src/assets/example.csv')
        .then(data => {
          setData(data)
          const options = data[0] ? Object.getOwnPropertyNames(data[0]) : null
          setOptions(options)
        })
    } catch (error) {
      throw (Error('Cannot read data'))
    }
  }, [])
  return { data, options }
}
