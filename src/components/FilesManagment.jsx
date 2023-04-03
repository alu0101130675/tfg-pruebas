import { useEffect, useState } from 'react'
import { deleteFile, getFilesNames } from '../services/data'
import './css/FilesManagment.css'
import { ConfirmMessage } from './ConfirmMessage'
import { useTrigger } from '../hooks/useTrigger'

export function FilesManagment () {
  const [files, setFiles] = useState()
  const [showDeleteMessage, setShowDeleteMessage] = useTrigger(false)
  useEffect(() => {
    getFilesNames().then(data => {
      setFiles(data)
    })
  }, [])
  return (
    <div className='files-list'>
      {files?.map(({ collectionName, _id }) => {
        return (
          <div className='file-list' key={_id}>
            <span>{collectionName}
            </span>
            <div className='config-buttons'>
              <button className='update-button' onClick={setShowDeleteMessage}>Actualizar</button>
              <button className='delete-button' onClick={setShowDeleteMessage}>Eliminar</button>
              {showDeleteMessage &&
                <ConfirmMessage
                  message='¿Seguro que deseas eliminar los datos?'
                  showMessage={setShowDeleteMessage}
                  action={() => deleteFile({ id: _id, name: collectionName })}
                />}

            </div>

          </div>
        )
      })}
    </div>
  )
}
