import { AddFileForm } from './AddFileForm'
import { useState, useContext } from 'react'
import { CHARTOPTIONS } from '../consts'
import { UserContext } from '../context/UserContext'
import { postFile, updateConfigFile } from '../services/data'
import './css/AdminFiles.css'
import { FilesManagment } from './FilesManagment'
import { useTrigger } from '../hooks/useTrigger'
import { ConfigTable } from './ConfigTable'

export function AdminFiles () {
  const [config, setConfig] = useState()
  const [file, setFile] = useState()
  const { user } = useContext(UserContext)
  const [showPostMessage, setShowPostMessage] = useTrigger(false)
  // const [updateConfigFile, setUpdateConfigFile] = useTrigger(false)
  const [updateFileId, setUpdatefileId] = useState()
  const handleOnClick = () => {
    if (file && config) {
      postFile({ name: file.name, token: user.token, documentData: file.documentData, config })
    } else {
      // updateConfigFile({ id: updateFileId, body: config })
      updateConfigFile({ id: updateFileId, body: config })
    }
    setFile()
    setUpdatefileId()
    setConfig()
    setShowPostMessage()
  }
  return (
    <>
      <AddFileForm setConfig={setConfig} setFile={setFile} />
      {showPostMessage && <h1>Fichero añadido</h1>}
      {config
        ? <>
          <ConfigTable config={config} setConfig={setConfig} />
          <button
            type='button'
            onClick={handleOnClick}
          >Enviar
          </button>
        </>
        : <FilesManagment setConfig={setConfig} setUpdatefileId={setUpdatefileId} />}
    </>
  )
}
