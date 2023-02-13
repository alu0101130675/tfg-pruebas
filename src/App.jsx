import { useState } from 'react'
import './App.css'
import { Chart } from './components/chart'
import { useDataSet } from './hooks/getData'
function getAxes ({ data }, field) {
  // console.log({ data, field })

  const y = data?.map(element =>
    element[field]
  )
  const unique = [...new Set(y)]
  console.log('CLAVE', unique)
  return unique
}
const setDataStructure = ({ data, xField, yField, gender }) => {
  const uniqueX = getAxes({ data }, xField)
  const uniqueY = getAxes({ data }, yField)
  // console.log({ uniqueX, uniqueY })
  function objectCreation () {
    const requestedRows = uniqueX.map(elementX => {
      return uniqueY.map(elementY => {
        return (Object.fromEntries([[xField, elementX], [yField, elementY]]))
      })
    })
    const flatRows = requestedRows.flat(1)
    // console.log({ gender, flatRows, data, xField, yField })

    const rowsFiltered = gender === 'both' ? flatRows : flatRows.filter((dataRow) => { return gender === dataRow.Sexo })
    return rowsFiltered
  }

  return objectCreation()
}
function chartDates ({ data, xField, yField, gender }) {
  const objectX = setDataStructure({ data, xField, yField, gender })
  const end = objectX.map((elemetX) => {
    const result = data.filter((dataElement) => {
      return elemetX[yField] === dataElement[yField] && elemetX[xField] === dataElement[xField]
    })
    const altura = result.length
    return { ...elemetX, altura }
  })
  // console.log({ end, objectX })
  return { end }
}

function App () {
  const { data } = useDataSet()
  const [showData, setShowData] = useState({ xField: 'Comunidad Autónoma', yField: 'Sexo', gender: 'both' })
  const [xFields, yFields] = [getAxes({ data }, showData.xField), getAxes({ data }, showData.yField)]
  const [selectedFields, setSelectedFields] = useState([{
    'eje X': {
      'Comunitat\nValenciana': true,
      Andalucía: true,
      'Castilla-La\nMancha': true,
      'País Vasco': true,
      'Comunidad de\nMadrid': true,
      Cantabria: true,
      Cataluña: true
    }
  },
  { 'eje Y': { Hombre: true, Mujer: true } }])
  const options = data[0] ? Object.getOwnPropertyNames(data[0]) : null
  const { end } = chartDates({ data, xField: showData.xField, yField: showData.yField, gender: showData.gender })

  console.log('what do you got', selectedFields)
  console.log('what do shpuld you got', selectedFields[0])
  const handleChange = (e) => {
    const axe = e.target.name
    const field = e.target.value
    const vectorAxesPosition = axe === 'eje X' ? 0 : 1
    const newFields = [...selectedFields]
    console.log('magia', newFields)
    newFields[vectorAxesPosition][axe][field] = !selectedFields[vectorAxesPosition][axe][field]
    console.log('magia', newFields)
    setSelectedFields(newFields)

    prueba({ data, field: 'edad', selected: newFields })
  }
  return (
    <main>
      <div className='main-part'>
        <Chart className='grafica' dataset={end} />
        <aside className='selector-section'>
          {selectedFields.map((field, i) => {
            const axe = Object.keys(field)[0]
            const stringKeys = Object.keys(field[axe])
            return (
              <div key={i} className='divider-margin'>
                <h3>{axe}</h3>
                <div className='select-space' select-space>
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
        </aside>

      </div>
      <div className='flex-horizontal'>
        <label>
          Pick a data for x axe:
          <select
            name='AxeX' id='AxeX' value={showData.xField} onChange={(e) => {
              const x = e.target.value
              setShowData({ xField: x, yField: showData.yField, gender: showData.gender })
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
            name='AxeY' id='AxeY' value={showData.yField} onChange={(e) => {
              const y = e.target.value
              setShowData({ xField: showData.xField, yField: y, gender: showData.gender })
            }}
          >
            {options?.map((value) => {
              return (<option key={value} value={value}>{value}</option>
              )
            })}
          </select>
        </label>
        {/* <label>
          Pick a data for y axe:
          <select
            name='gender' id='gender' value={showData.gender} onChange={(e) => {
              const gender = e.target.value
              setShowData({ xField: showData.xField, yField: showData.yField, gender })
            }}
          >
            {['Hombre', 'Mujer', 'both'].map((value) => {
              return (<option key={value} value={value}>{value}</option>
              )
            })}
          </select>
        </label>

        <label>
          Pick a field for y axe:
          <select
            name='gender' id='gender' value={showData.gender} onChange={(e) => {
              const gender = e.target.value
              setShowData({ xField: showData.xField, yField: showData.yField, gender })
            }}
          >
            {['Hombre', 'Mujer', 'both'].map((value) => {
              return (<option key={value} value={value}>{value}</option>
              )
            })}
          </select>
        </label>
        <label> */}
        Pick a field for x axe:
        {/* <select
            name='gender' id='gender' multiple={true} defaultValue={['Hombre', 'Mujer', 'both']} // onChange={(e) => {
            //   console.log(e.target.value)
            //   // const gender = e.target.value
            //   // setShowData({ xField: showData.xField, yField: showData.yField, gender })
            // }}
          >
            {['Hombre', 'Mujer', 'both'].map((value) => {
              return (<option key={value} value={value}>{value}</option>
              )
            })}
          </select> */}

      </div>

    </main>
  )
}

export default App
