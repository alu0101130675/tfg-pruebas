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
export async function getConfigFile ({ fileName, idFlag }) {
  const { data } = await axios.get(`http://localhost:3001/data/configField/${fileName}/${idFlag}`)
  return data
}
export async function getDataByFileName ({ fileName }) {
  const { data } = await axios.get(`http://localhost:3001/data/dataFile${fileName}`)
  return data
}
export async function getFilesNames () {
  const { data } = await axios.get('http://localhost:3001/data/configFiles')
  return data
}
export async function deleteFile ({ id, name }) {
  const { data } = await axios.delete(`http://localhost:3001/data/dataFile/${name}/${id}`)
  return data
}
export async function updateConfigFile ({ id, body }) {
  const { data } = await axios.put(`http://localhost:3001/data/configFiles/${id}`, body)
  return data
}
