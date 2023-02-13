import { useState } from 'react'
import { getFiltered } from '../logic/getFitered'

export function useAxeFields ({ data, axes, filter }) {
  const [fields, setFields] = useState()
  console.log({ data, fields, filter })
  const filtered = getFiltered({ data, fields, filter })
  if (filtered) {
    setFields(fitered)
    return filtered
  }
}
/** mirar lo de child, como se usan los hooks personalizados */
