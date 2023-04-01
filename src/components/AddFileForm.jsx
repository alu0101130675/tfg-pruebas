
import './css/AddFileForm.css'
import { allPairCombination } from '../logic/allPairCombination'
export function AddFileForm ({ setConfig, setFile }) {
  const reader = new FileReader()

  const handleSubmit = (e) => {
    e.preventDefault()
    const file = e.target.elements.fileInput.files[0]
    const name = e.target.elements.fileName.value
    reader.onload = () => {
      const contents = reader.result
      const rows = contents.split('\n')
        .filter(row => row.trim().length > 0)
      const headers = rows.shift().split(',')
      const config = allPairCombination(headers)
      setConfig(config)
      const documentData = rows.map(row => {
        const values = row.split(',')
        return values.reduce((obj, val, i) => {
          obj[headers[i]] = val.trim()
          return obj
        }, {})
      })
      setFile({ name, documentData })
    }
    reader.readAsText(file)
  }

  return (
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
    </form>
  )
}
