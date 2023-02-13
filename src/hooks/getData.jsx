import * as d3 from 'd3'
import { useEffect, useState } from 'react'

export function useDataSet () {
  const [data, setData] = useState([])

  useEffect(() => {
    try {
      d3.csv('./src/assets/example.csv')
        .then(data => {
          setData(data)
        })
    } catch (error) {
      throw (Error('Cannot read data'))
    }
  }, [])
  return { data }
}
