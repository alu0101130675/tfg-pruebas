const WEIGHHINGIN = {
  'etapa A': {
    Hombre: 1595 / 31,
    Mujer: 314 / 42
  },
  'etapa B': {
    Hombre: 5481 / 99,
    Mujer: 2040 / 99
  },
  'etapa C': {
    Hombre: 516 / 20,
    Mujer: 261 / 25
  }
}
export function wheighing (data, weight) {
  let result = 0
  console.log(weight)
  data.forEach(element => {
    console.log(element.Etapa)
    result += Number(weight[element.Etapa][element.Sexo])
  }
  )
  return result
}
