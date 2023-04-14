import { CHARTOPTIONS } from '../consts'

export function allCombinationTwoVectors (vector1, vector2) {
  const combinations = []
  vector1.forEach(element => {
    vector2.forEach(element2 => {
      if (!vector1.includes(element2)) {
        combinations.push([element, element2, CHARTOPTIONS[0]])
      }
    })
  })
  return combinations
}
