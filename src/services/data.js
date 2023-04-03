import axios from 'axios'
export async function postFile ({ token, name, documentData, config }) {
  const authentication = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const { data } = await axios
    .post(`http://localhost:3001/data/${name}`, { documentData, config }, authentication)
  return data
}
export async function getFileNameWithoutId () {
  const { data } = await axios.get('http://localhost:3001/data/fileNames')
  return data
}
export async function getConfigFile ({ fileName }) {
  const { data } = await axios.get(`http://localhost:3001/data/configField/${fileName}`)
  return data
}
export async function getDataByFileName ({ fileName }) {
  const { data } = await axios.get(`http://localhost:3001/data/dataFile${fileName}`)
  return data
}
export async function getFilesNames () {
  const { data } = await axios.get('http://localhost:3001/data/configFiles')
  console.log('que esta pasando', data)
  return data
}
export async function deleteFile ({ id, name }) {
  console.log('BORRANDO')
  const { data } = await axios.delete(`http://localhost:3001/data/dataFile/${name}/${id}`)
  return data
}
