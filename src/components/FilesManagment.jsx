import { useEffect, useState } from 'react'
import { deleteFile, getConfigFile, getFilesNames } from '../services/data'
import './css/FilesManagment.css'
import { ConfirmMessage } from './ConfirmMessage'
export function FilesManagment ({ setConfig, setUpdatefileId, token }) {
  const [files, setFiles] = useState()
  const [fileToDelete, setFileToDelete] = useState()
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
              <button
                className='delete-button' onClick={() => {
                  setFileToDelete({ id: _id, name: collectionName })
                }}
              >Eliminar
              </button>
              {fileToDelete &&
                <ConfirmMessage
                  message='¿Seguro que deseas eliminar los datos?'
                  showMessage={() => setFileToDelete()}
                  action={() => {
                    const { id, name } = fileToDelete
                    console.log('donde slade mal////:', id)
                    deleteFile({ id, name, token })
                  }}
                />}
            </div>
          </div>
        )
      })}
    </div>
  )
}
