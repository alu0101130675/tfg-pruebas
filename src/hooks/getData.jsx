import { useEffect, useState } from 'react'
import { getAxes } from '../logic/getAxes'
import { getDataByFileName } from '../services/data'
export function useDataSet ({ pathname }) {
  const [data, setData] = useState()
  const [options, setOptions] = useState()
  const [axes, setAxes] = useState()
  const [selectedFields, setSelectedFields] = useState()
  useEffect(() => {
    getDataByFileName({ pathname })
      .then(data => {
        const dataWithoutId = data.map(({ _id, ...rest }) => rest)
        setData(dataWithoutId)
        const options = dataWithoutId[0] ? Object.getOwnPropertyNames(dataWithoutId[0]) : null
        setOptions(options)
        console.log('axesProblem', getAxes({ dataWithoutId, field: options[0] }))
        setAxes({ xField: options[0], yField: options[1] })
        setSelectedFields([{
          xField: getAxes({ data: dataWithoutId, field: options[0] })
        },
        { yField: getAxes({ data: dataWithoutId, field: options[1] }) }])
      }).catch(err => console.log(err))
  }, [])
  return { data, options, selectedFields, setSelectedFields, setAxes, axes }
}
