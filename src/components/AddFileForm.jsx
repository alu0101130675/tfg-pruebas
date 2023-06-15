
import './css/AddFileForm.css'
import { allPairCombination } from '../logic/allPairCombination'
import { AdminSelectAxes } from './AdminSelectAxes'
import { allCombinationTwoVectors } from '../logic/allPairCombinationInTwoVectors'
import { updateCollectionName } from '../services/data'
import { toast } from 'react-hot-toast'
export function AddFileForm ({ setConfig, setFile, axes, setAxes, config, setAxesFlag, axesFlag, file, updateFileId, setUpdatefileId, token }) {
  const oldName = file?.name ?? ''
  const handleSubmit = (e) => {
    e.preventDefault()
    if (!updateFileId) {
      const reader = new FileReader()
      const file = e.target.elements.fileInput.files[0]
      const name = e.target.elements.fileName.value
      const description = e.target.elements.description.value

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
        setFile({ name, documentData, description })
      }
      reader.readAsText(file)
    } else {
      const newName = e.target.elements.fileName.value
      const description = e.target.elements.description.value
      toast.promise(
        updateCollectionName({ oldName, description, id: updateFileId, newName, token }),
        {
          loading: 'Actualizando...',
          success: () => {
            setUpdatefileId(null)
            setFile(null)
            return (<b>Actualizado con exito</b>)
          },
          error: (error) => {
            console.log(error)
            return (<b>No se pudo actualizar</b>)
          }
        }
      )
    }
  }

  return (
    <>
      {((updateFileId && file) || !updateFileId) &&
        <form className='post-form' onSubmit={handleSubmit}>
          <div className='form-fields'>
            <input
              className='form-input'
              type='text'
              placeholder='Nombre del documento en base de datos'
              name='fileName'
              required
              defaultValue={file?.name ?? ''}
            />
            {!updateFileId && <input
              type='file'
              accept='.csv'
              name='fileInput'
              required
                              />}
          </div>
          <input
            className='form-input'
            type='text'
            placeholder='Descripcion sobre el conjunto de datos'
            name='description'
            required
            defaultValue={file?.description ?? ''}
          />
          <button type='submit'>{updateFileId ? 'Actualizar Nombre y Descripcion' : 'Generar fichero de configuración'}</button>
          {updateFileId && <button style={{ backgroundColor: 'gray', borderColor: 'gray', marginTop: '2px' }} onClick={() => { setFile(null); setUpdatefileId(null) }} type='reset'>Cancelar</button>}
        </form>}
      {config && !axesFlag &&
        <>
          <AdminSelectAxes axes={axes} setAxes={setAxes} />
          <div className='pararel'>
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
                setUpdatefileId(null)
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
