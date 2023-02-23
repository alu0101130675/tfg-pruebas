import { useState } from 'react'
import { useAxeFields } from '../hooks/axesFields'
import { Chart } from './chart'

function getAxes ({ data, field }) {
  const y = data?.map(element =>
    [element[field], true]
  )
  const unique = [...new Set(y)]
  const filtres = Object.fromEntries(unique)
  console.log('FILTRES', filtres)
  return filtres
}

const setDataStructure = ({ xField, yField, gender, x, y }) => {
  function objectCreation () {
    const requestedRows = x.map(elementX => {
      return y.map(elementY => {
        return (Object.fromEntries([[xField, elementX], [yField, elementY]]))
      })
    })
    const flatRows = requestedRows.flat(1)

    const rowsFiltered = gender === 'both' ? flatRows : flatRows.filter((dataRow) => { return gender === dataRow.Sexo })
    return rowsFiltered
  }

  return objectCreation()
}

function chartDates ({ data, axes, gender, fields }) {
  const { xField, yField } = axes
  const [x, y] = fields
  console.log(yField)
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
  const dataSet = aux.filter(d => d !== '')
  console.log(dataSet)
  return { dataSet }
}

export function Options ({ data, options }) {
  const [axes, setAxes] = useState({ xField: 'Comunidad Autónoma', yField: 'Sexo'/*, gender: 'both' */ })
  const [selectedFields, setSelectedFields] = useState([{
    'eje X': getAxes({ data, field: axes.xField })
  },
  { 'eje Y': getAxes({ data, field: axes.yField }) }])
  const fields = useAxeFields({ axes, filter: selectedFields })

  const handleChange = (e) => {
    const axe = e.target.name
    const field = e.target.value
    const vectorAxesPosition = axe === 'eje X' ? 0 : 1
    const newFields = [...selectedFields]
    newFields[vectorAxesPosition][axe][field] = !selectedFields[vectorAxesPosition][axe][field]
    setSelectedFields(newFields)
  }
  const { dataSet } = chartDates({ data, axes, gender: 'both', fields })
  console.log('YUPEEEEEEEEEEEEEEE', selectedFields[0])

  return (
    <>
      {dataSet.length !== 0 ? <Chart className='grafica' dataset={dataSet} keyFields={selectedFields[1]['eje Y']} /> : <p>Seleciona como minimo un campo en cada eje</p>}
      <div className='flex-horizontal'>
        <label>
          Pick a data for x axe:
          <select
            name='AxeX' id='AxeX' value={axes.xField} onChange={(e) => {
              const x = e.target.value
              const newXField = Object.assign(axes, { xField: x })
              setAxes(newXField)
              const [, selectedY] = selectedFields
              const newSelectedFields = [{
                'eje X': getAxes({ data, field: newXField.xField })
              },
              selectedY]
              setSelectedFields(newSelectedFields)
            }}
          >
            {options?.map((value) => {
              return (<option key={value} value={value}>{value}</option>
              )
            })}
          </select>
        </label>
        <label>
          Pick a data for y axe:
          <select
            name='AxeY' id='AxeY' value={axes.yField} onChange={(e) => {
              const y = e.target.value
              const newXField = Object.assign(axes, { yField: y })
              setAxes(newXField)
              const [selectedX] = selectedFields
              const newSelectedFields = [
                selectedX,
                {
                  'eje Y': getAxes({ data, field: newXField.yField })
                }]
              setSelectedFields(newSelectedFields)
            }}
          >
            {options?.map((value) => {
              return (<option key={value} value={value}>{value}</option>
              )
            })}
          </select>
        </label>
      </div>
      <div className='selector-section'>
        {selectedFields.map((field, i) => {
          const axe = Object.keys(field)[0]
          const stringKeys = Object.keys(field[axe])
          return (
            <div key={i} className='divider-margin'>
              <h3>{axe}</h3>
              <div className='select-space'>
                {stringKeys.map((key, i) => {
                  const column = i % 2 === 0 ? 1 : 2
                  return (
                    <label key={key} style={{ gridColumn: column }}>
                      <input name={axe} type='checkbox' defaultChecked='true' value={key} onChange={handleChange} />
                      {key}
                    </label>
                  )
                }
                )}

              </div>
            </div>
          )
        })}
      </div>
    </>

  )
}
