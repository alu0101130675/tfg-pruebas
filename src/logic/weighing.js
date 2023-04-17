/* const WEIGHHINGIN = {
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
} */
export function wheighing (data) {
  let result = 0
  data.forEach(element => {
    switch (element.etapa) {
      case 'Etapa A':
        result += element.Sexo === 'Mujer' ? 314 / 42 : 1595 / 31
        break
      case 'Etapa B':
        result += element.Sexo === 'Mujer' ? 2040 / 99 : 5481 / 99
        break
      case 'Etapa C':
        result += element.Sexo === 'Mujer' ? 261 / 25 : 516 / 20
        break
      default:
        result += element.Sexo === 'Mujer' ? 615 / 48 : 1156 / 42
    }
  })
  console.log('resultado', result)
  return result
}
