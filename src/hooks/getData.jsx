import { useEffect, useState } from 'react'
import { getAxes } from '../logic/getAxes'
import { getDataByFileName } from '../services/data'
export function useDataSet ({ pathname }) {
  const [data, setData] = useState()
  const [options, setOptions] = useState()
  const [axes, setAxes] = useState()
  const [selectedFields, setSelectedFields] = useState()
  useEffect(() => {
    getDataByFileName({ fileName: pathname })
      .then(data => {
        setData(data)
        const options = data[0] ? Object.getOwnPropertyNames(data[0]) : null
        setOptions(options)
        setAxes({ xField: options[0], yField: options[1] })
        setSelectedFields([{
          xField: getAxes({ data, field: options[0] })
        },
        { yField: getAxes({ data, field: options[1] }) }])
      }).catch(err => console.log(err))
  }, [pathname])
  return { data, options, selectedFields, setSelectedFields, setAxes, axes }
}
