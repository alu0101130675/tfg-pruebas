import { AddFileForm } from './AddFileForm'
import { useState, useContext } from 'react'
import { CHARTOPTIONS } from '../consts'
import { UserContext } from '../context/UserContext'
import { postFile } from '../services/data'
import './css/AdminFiles.css'

export function AdminFiles () {
  const [config, setConfig] = useState()
  const [file, setFile] = useState()
  const { user } = useContext(UserContext)

  const handleTableSelects = (event) => {
    const { id, value } = event.target
    const newConfig = [...config]
    newConfig[id] = [...newConfig[id]]
    newConfig[id][2] = value
    setConfig(newConfig)
  }

  return (
    <>
      <AddFileForm setConfig={setConfig} setFile={setFile} />
      <table onChange={(event) => handleTableSelects(event)}>
        <thead className='thead-config'>
          <tr>
            <th>Campo 1</th>
            <th>Campo 2</th>
            <th>Grafica Recomendada</th>
          </tr>
        </thead>
        <tbody>
          {config?.map(([field1, field2], i) => {
            return (
              <tr className='tr-config' key={i}>
                <th>{field1}</th>
                <th>{field2}</th>
                <th className='th-select'>
                  <select id={i} className='chart-selector'>
                    {CHARTOPTIONS.map(Chartoption => <option key={Chartoption}>{Chartoption}</option>)}
                  </select>
                </th>
              </tr>
            )
          })}
        </tbody>

      </table>
      <button
        type='button'
        onClick={() => {
          postFile({ name: file.name, token: user.token, documentData: file.documentData, config })
        }}
      >Enviar
      </button>
    </>
  )
}
