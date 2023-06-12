import { CHARTOPTIONS } from '../consts'

export function allPairCombination (vector) {
  const result = []
  for (let i = 0; i < vector.length - 1; i++) {
    for (let j = i + 1; j < vector.length; j++) {
      result.push([vector[i], vector[j], CHARTOPTIONS[0], ''])
    }
  }
  return result
}
