
import './css/AddFileForm.css'
import { allPairCombination } from '../logic/allPairCombination'
import { AdminSelectAxes } from './AdminSelectAxes'
import { allCombinationTwoVectors } from '../logic/allPairCombinationInTwoVectors'
export function AddFileForm ({ setConfig, setFile, axes, setAxes, config, setAxesFlag, axesFlag }) {
  const handleSubmit = (e) => {
    const reader = new FileReader()
    e.preventDefault()
    const file = e.target.elements.fileInput.files[0]
    const name = e.target.elements.fileName.value
    reader.onload = () => {
      const contents = reader.result
      const rows = contents.split('\n')
        .filter(row => row.trim().length > 0)
      const headers = rows.shift().split(',')
      setAxes((prevState) => ({ ...prevState, axeX: prevState.axeX.concat(headers) }))
      setConfig([])
      const documentData = rows.map(row => {
        const values = row.split(',')
        return values.reduce((obj, val, i) => {
          obj[headers[i]] = val.trim()
          return obj
        }, {})
      })
      setFile({ name, documentData })
    }
    reader.readAsText(file)
  }

  return (
    <>
      <form className='post-form' onSubmit={handleSubmit}>
        <input
          className='form-input'
          type='text'
          placeholder='Nombre del documento en base de datos'
          name='fileName'
          required
        />
        <input
          type='file'
          accept='.csv'
          name='fileInput'
          required
        />
        <button type='submit'>Generar fichero de configuración</button>
      </form>
      {config && !axesFlag &&
        <>
          <AdminSelectAxes axes={axes} setAxes={setAxes} />
          <div className='pararel-buttons'>
            <button
              className='update-button'
              type='button'
              onClick={() => {
                const y = allPairCombination(axes.axeY)
                const x = allCombinationTwoVectors(axes.axeY, axes.axeX)
                const axesconfig = y.concat(x)
                setConfig((prev) => prev.concat(axesconfig))
                setAxesFlag(true)
              }}
            >Generar configuración de gráficas
            </button>
            <button
              type='button'
              onClick={() => {
                setConfig()
                setAxes({ axeX: [], axeY: [] })
              }}
              className='delete-button'
            >Cancelar
            </button>
          </div>
        </>}
    </>

  )
}
