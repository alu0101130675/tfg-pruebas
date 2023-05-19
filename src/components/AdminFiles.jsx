import { AddFileForm } from './AddFileForm'
import { useState, useContext } from 'react'
import { UserContext } from '../context/UserContext'
import { postFile, updateConfigFile } from '../services/data'
import './css/AdminFiles.css'
import { FilesManagment } from './FilesManagment'
import { ConfigTable } from './ConfigTable'
import { toast } from 'react-hot-toast'

function AdminFiles () {
  const [config, setConfig] = useState()
  const [axesFlag, setAxesFlag] = useState(false)
  const [file, setFile] = useState()
  const [axes, setAxes] = useState({ axeX: [], axeY: [] })
  const { user } = useContext(UserContext)
  const [updateFileId, setUpdatefileId] = useState()
  const handleOnClickSend = () => {
    if (file && config) {
      toast.promise(
        postFile({ name: file.name, token: user.token, documentData: file.documentData, config, axes }),
        {
          loading: 'Subiendo fichero...',
          success: <b>Fichero guardado</b>,
          error: (error) => {
            console.log(error)
            return (<b>No se pudo guardar</b>)
          }
        }
      )
    } else {
      toast.promise(
        updateConfigFile({ id: updateFileId, body: { config, axes }, token: user.token }),
        {
          loading: 'Actualizando fichero...',
          success: <b>Fichero actualizado</b>,
          error: (error) => {
            console.log(error)
            return (<b>No se pudo actualizar</b>)
          }
        }
      )
    }
    setFile()
    setUpdatefileId()
    setConfig()
    setAxesFlag(false)
    setAxes({ axeX: [], axeY: [] })
  }
  const handleOnClickCancel = () => {
    setFile()
    setUpdatefileId()
    setConfig()
    setAxesFlag(false)
    setAxes({ axeX: [], axeY: [] })
  }
  return (
    <>
      <h1 className='page-title'>Administración de archivos csv</h1>
      <AddFileForm setConfig={setConfig} setFile={setFile} setAxes={setAxes} axes={axes} config={config} setAxesFlag={setAxesFlag} axesFlag={axesFlag} />
      {config
        ? axesFlag && config &&
          <>
            <ConfigTable config={config} setConfig={setConfig} />
            <div className='pararel-buttons'>
              <button
                className='update-button'
                type='button'
                onClick={handleOnClickSend}
              >Enviar
              </button>
              <button
                type='button'
                onClick={handleOnClickCancel}
                className='delete-button'
              >Cancelar
              </button>
            </div>
          </>
        : <FilesManagment
            setConfig={setConfig}
            setUpdatefileId={setUpdatefileId}
            token={user.token}
            setAxes={setAxes}
            setAxesFlag={setAxesFlag}
          />}
    </>
  )
}
export default AdminFiles
