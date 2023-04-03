import { AddFileForm } from './AddFileForm'
import { useState, useContext } from 'react'
import { CHARTOPTIONS } from '../consts'
import { UserContext } from '../context/UserContext'
import { postFile } from '../services/data'
import './css/AdminFiles.css'
import { FilesManagment } from './FilesManagment'
import { useTrigger } from '../hooks/useTrigger'
import { ConfigTable } from './ConfigTable'

export function AdminFiles () {
  const [config, setConfig] = useState()
  const [file, setFile] = useState()
  const { user } = useContext(UserContext)
  const [showPostMessage, setShowPostMessage] = useTrigger(false)
  const [updateConfigFile, setUpdateConfigFile] = useTrigger(false)

  const handleOnClick = () => {
    postFile({ name: file.name, token: user.token, documentData: file.documentData, config })
    setFile()
    setConfig()
    setShowPostMessage()
  }
  return (
    <>
      <AddFileForm setConfig={setConfig} setFile={setFile} />
      {showPostMessage && <h1>Fichero añadido</h1>}
      {file
        ? <>
          <ConfigTable config={config} setConfig={setConfig} />
          <button
            type='button'
            onClick={handleOnClick}
          >Enviar
          </button>
          </>
        : <FilesManagment />}
    </>
  )
}
