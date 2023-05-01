import { setDataStructure } from './setDataStructure'
import { mergeObjects } from './mergeObjects'
import { wheighing } from './weighing'
export function chartDate ({ data, axes, gender, fields }) {
  const { xField, yField } = axes
  const [x, y] = fields
  const objectX = setDataStructure({ xField, yField, gender, x, y })
  const aux = objectX.map((elemetX) => {
    const result = data.filter((dataElement) => {
      return elemetX[yField] === dataElement[yField] && elemetX[xField] === dataElement[xField]
    })
    const length = result.length
    if (length !== 0) {
      const yKey = result[0][yField]
      const altura = Math.trunc(wheighing(result))

      return { ...elemetX, [yKey]: altura, xField }
    }
    return ''
  })
  const arrayWithoutZero = aux.filter(d => d !== '')
  const dataSet = mergeObjects(arrayWithoutZero, xField)
  return { dataSet }
}
