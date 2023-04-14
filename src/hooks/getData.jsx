import { useEffect, useState } from 'react'
import { getAxes } from '../logic/getAxes'
import { getDataByFileName, getOptions } from '../services/data'
export function useDataSet ({ pathname }) {
  const [data, setData] = useState()
  const [options, setOptions] = useState()
  const [axes, setAxes] = useState()
  const [selectedFields, setSelectedFields] = useState()
  useEffect(() => {
    getDataByFileName({ fileName: pathname })
      .then(data => {
        const fileName = pathname.slice(1, pathname.lenght)
        getOptions({ fileName }).then(({ axeX, axeY }) => {
          setData(data)
          setOptions({ axeX, axeY })
          setAxes({ xField: axeX[0], yField: axeY[1] })
          setSelectedFields([{
            xField: getAxes({ data, field: axeX[0] })
          },
          { yField: getAxes({ data, field: axeY[1] }) }])
        }).catch(e => console.log(e))
      }).catch(err => console.log(err))
  }, [pathname])
  return { data, options, selectedFields, setSelectedFields, setAxes, axes }
}
