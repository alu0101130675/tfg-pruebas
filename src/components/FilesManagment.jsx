import { useEffect, useState } from 'react'
import { deleteFile, getConfigFile, getDescription, getFilesNames, getOptions } from '../services/data'
import './css/FilesManagment.css'
import { toast } from 'react-hot-toast'
import { ConfirmMessage } from './ConfirmMessage'
export function FilesManagment ({ setConfig, setUpdatefileId, token, setAxes, setAxesFlag, setFile }) {
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
  const handleUpdateFilename = ({ _id, collectionName }) => {
    const name = collectionName
    getDescription({ id: _id })
      .then(({ description }) => {
        setUpdatefileId(_id)
        setFile({ name, description })
      })
  }
  return (
    <div className='files-list'>
      {files?.map(({ collectionName, _id }) => {
        return (
          <div className='file-list' key={_id}>
            <span>{collectionName}
            </span>
            <div className='config-buttons'>
              <button className='update-button' onClick={() => handleUpdateFilename({ _id, collectionName })}>Actualizar nombre y descripción</button>
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
                    console.log(id, name)
                    toast.promise(
                      deleteFile({ id, name, token }),
                      {
                        loading: 'Eliminando fichero...',
                        success: <b>Fichero eliminado</b>,
                        error: (error) => {
                          console.log(error)
                          return (<b>No se pudo eliminar</b>)
                        }
                      }
                    )
                  }}
                />}
            </div>
          </div>
        )
      })}
    </div>
  )
}
