import { useEffect, useState } from 'react'
import { deleteFile, getConfigFile, getFilesNames } from '../services/data'
import './css/FilesManagment.css'
import { ConfirmMessage } from './ConfirmMessage'
import { useTrigger } from '../hooks/useTrigger'
export function FilesManagment ({ setConfig, setUpdatefileId, token }) {
  const [files, setFiles] = useState()
  const [showDeleteMessage, setShowDeleteMessage] = useTrigger(false)
  useEffect(() => {
    getFilesNames().then(data => {
      setFiles(data)
    })
  }, [])
  const handleUpdate = ({ collectionName }) => {
    getConfigFile({ fileName: collectionName, idFlag: true })
      .then(({ config, _id }) => {
        setUpdatefileId(_id)
        setConfig(config)
      })
      .catch(e => console.log(e))
  }
  return (
    <div className='files-list'>
      {files?.map(({ collectionName, _id }) => {
        return (
          <div className='file-list' key={_id}>
            <span>{collectionName}
            </span>
            <div className='config-buttons'>
              <button className='update-button' onClick={() => handleUpdate({ collectionName })}>Actualizar</button>
              <button className='delete-button' onClick={setShowDeleteMessage}>Eliminar</button>
              {showDeleteMessage &&
                <ConfirmMessage
                  message='¿Seguro que deseas eliminar los datos?'
                  showMessage={setShowDeleteMessage}
                  action={() => deleteFile({ id: _id, name: collectionName, token })}
                />}
            </div>
          </div>
        )
      })}
    </div>
  )
}
