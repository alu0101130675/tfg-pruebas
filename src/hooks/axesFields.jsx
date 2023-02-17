import { useEffect, useState } from 'react'
import { getFiltered } from '../logic/getFitered'

export function useAxeFields ({ axes, filter }) {
  const [fields, setFields] = useState()
  const axesKeys = Object.keys(axes)
  /** MIRAR POR QUE AQUI HAY QUE USAR USEEFECT */
  // useEffect(() => {
  const newFields = axesKeys.map((_, i) => getFiltered({ filter: filter[i] }))
  // setFields(newFields)
  // }, [axes, filter])

  // const filtered = axes.map(axe => getFiltered({ data, axe, filter })
  return newFields
}
/** mirar lo de child, como se usan los hooks personalizados */
