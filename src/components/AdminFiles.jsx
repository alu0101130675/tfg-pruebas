import { AddFileForm } from './AddFileForm'
import { useState, useContext } from 'react'
import { UserContext } from '../context/UserContext'
import { postFile, updateConfigFile } from '../services/data'
import './css/AdminFiles.css'
import { FilesManagment } from './FilesManagment'
import { ConfigTable } from './ConfigTable'

function AdminFiles () {
  const [config, setConfig] = useState()
  const [axesFlag, setAxesFlag] = useState(false)
  const [file, setFile] = useState()
  const [axes, setAxes] = useState({ axeX: [], axeY: [] })
  const { user } = useContext(UserContext)
  const [showPostMessage, setShowPostMessage] = useState()
  const [updateFileId, setUpdatefileId] = useState()
  const handleOnClickSend = () => {
    if (file && config) {
      postFile({ name: file.name, token: user.token, documentData: file.documentData, config, axes })
        .then(() => setShowPostMessage('Fichero Añadido'))
        .catch((err) => {
          setShowPostMessage(err.response.data.message)
        })
    } else {
      updateConfigFile({ id: updateFileId, body: { config, axes }, token: user.token })
        .then(setShowPostMessage('Actualizado'))
        .catch((e) => setShowPostMessage('Error al actualizar'))
    }
    setFile()
    setUpdatefileId()
    setConfig()
    setAxesFlag(false)
    setAxes({ axeX: [], axeY: [] })
    // setShowPostMessage()
  }
  const handleOnClickCancel = () => {
    setFile()
    setUpdatefileId()
    setConfig()
    setShowPostMessage()
    setAxesFlag(false)
    setAxes({ axeX: [], axeY: [] })
  }
  return (
    <>
      <AddFileForm setConfig={setConfig} setFile={setFile} setAxes={setAxes} axes={axes} config={config} setAxesFlag={setAxesFlag} axesFlag={axesFlag} />
      {showPostMessage && <h1>{showPostMessage}</h1>}
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
