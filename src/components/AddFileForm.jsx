import { postFile } from '../services/data'
import { UserContext } from '../context/UserContext'
import { useContext } from 'react'
import './css/AddFileForm.css'
export function AddFileForm () {
  const { user } = useContext(UserContext)
  const reader = new FileReader()

  const handleSubmit = (e) => {
    e.preventDefault()
    const file = e.target.elements.fileInput.files[0]
    const name = e.target.elements.fileName.value
    console.log(name)
    reader.onload = () => {
      const contents = reader.result
      const rows = contents.split('\n')
        .filter(row => row.trim().length > 0)
      const headers = rows.shift().split(',') // elimina el priimer elemento y lo retorna
      const documentData = rows.map(row => {
        const values = row.split(',')
        return values.reduce((obj, val, i) => {
          obj[headers[i]] = val.trim()
          return obj
        }, {})
      })
      console.log(documentData)
      postFile({ name, token: user.token, documentData })
    }
    reader.readAsText(file)
  }

  return (
    <>
      {user.role === 'admin' &&
        <form className='post-form' onSubmit={handleSubmit}>
          <input
            type='text'
            placeholder='Nombre del documento en base de datos'
            name='fileName'
          />
          <input
            type='file'
            accept='.csv'
            name='fileInput'
          />
          <button type='submit'>Enviar</button>
        </form>}
    </>
  )
}
