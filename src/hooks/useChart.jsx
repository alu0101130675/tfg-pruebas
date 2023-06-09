import { useEffect, useState } from 'react'
import { getConfigFile } from '../services/data'
import { findDefaultChart } from '../logic/findDefaultChart'
export function useChart ({ pathname, selectedFields, axes }) {
  const [chartSelected, setChartSelected] = useState('Gráfico de barras')
  const [chartDescription, setChartDescription] = useState('Gráfico de barras')
  const [configFile, setConfigFile] = useState()

  useEffect(() => {
    const fileName = pathname.slice(1, pathname.lenght)
    getConfigFile({ fileName }).then(({ config, description }) => {
      setChartDescription(description)
      setConfigFile(config)
    }).catch(e => console.log(e))
  }, [pathname])
  useEffect(() => {
    const chart = findDefaultChart({ configFile, selectedFields })
    chart && setChartSelected(chart)
  }, [axes])
  return { chartSelected, setChartSelected, chartDescription }
}
