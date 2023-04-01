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
export async function getFileNames () {
  const { data } = await axios.get('http://localhost:3001/data/fileNames')
  return data
}
export async function getConfigFile ({ fileName }) {
  const { data } = await axios.get(`http://localhost:3001/data/configField/${fileName}`)
  return data
}
export async function getDataByFileName ({ fileName }) {
  // const { data } = await axios.get(`http://localhost:3001/data/dataFile${fileName}`)
  const { data } = await axios.get('http://localhost:3001/data/dataFile/probando')
  return data
}
