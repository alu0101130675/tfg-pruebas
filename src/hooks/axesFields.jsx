import { getFiltered } from '../logic/getFitered'

export function axeFields ({ axes, filter }) {
  const axesKeys = Object.keys(axes)
  const newFields = axesKeys.map((_, i) => getFiltered({ filter: filter[i] }))

  return newFields
}
