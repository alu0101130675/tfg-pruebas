import { useEffect, useState } from 'react'
import { deleteFile, getConfigFile, getFilesNames, getOptions } from '../services/data'
import './css/FilesManagment.css'
import { ConfirmMessage } from './ConfirmMessage'
export function FilesManagment ({ setConfig, setUpdatefileId, token, setAxes, setAxesFlag }) {
  const [files, setFiles] = useState()
  const [fileToDelete, setFileToDelete] = useState()
  useEffect(() => {
    getFilesNames().then(data => {
      setFiles(data)
    })
  }, [])
  const handleUpdate = ({ collectionName, chartsOnly }) => {
    getConfigFile({ fileName: collectionName, idFlag: true })
      .then(({ config, _id }) => {
        setUpdatefileId(_id)
        if (chartsOnly) {
          setConfig(config)
          setAxesFlag(true)
        } else {
          setConfig([])
        }

        getOptions({ fileName: collectionName })
          .then(({ axeX, axeY }) => setAxes({ axeX, axeY }))
          .catch(e => console.log(e))
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
              <button className='update-button' onClick={() => handleUpdate({ collectionName, chartsOnly: true })}>Actualizar gráficas</button>
              <button className='update-button' onClick={() => handleUpdate({ collectionName, chartsOnly: false })}>Actualizar todo</button>
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
