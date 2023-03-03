import { setDataStructure } from './setDataStructure'
import { mergeObjects } from './mergeObjects'
export function chartDate ({ data, axes, gender, fields }) {
  const { xField, yField } = axes
  const [x, y] = fields
  const objectX = setDataStructure({ xField, yField, gender, x, y })

  const aux = objectX.map((elemetX) => {
    const result = data.filter((dataElement) => {
      return elemetX[yField] === dataElement[yField] && elemetX[xField] === dataElement[xField]
    })
    const altura = result.length
    if (altura !== 0) { /// total se usa para calcular el porcentage
      const yKey = result[0][yField]

      return { ...elemetX, [yKey]: altura, xField }
    }
    return ''
  })
  const arrayWithoutZero = aux.filter(d => d !== '')
  const dataSet = mergeObjects(arrayWithoutZero, xField)
  return { dataSet }
}