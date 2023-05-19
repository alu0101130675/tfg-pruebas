import axios from 'axios'
export async function postFile ({ token, name, documentData, config, axes }) {
  const authentication = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const { data } = await axios
    .post(`https://women-info-backend.onrender.com/data/${name}`, { documentData, config, axes }, authentication)
  return data
}
export async function getFileNameWithoutId () {
  const { data } = await axios.get('https://women-info-backend.onrender.com/data/fileNames')
  return data
}
export async function getConfigFile ({ fileName, idFlag }) {
  const { data } = await axios.get(`https://women-info-backend.onrender.com/data/configField/${fileName}/${idFlag}`)
  return data
}
export async function getOptions ({ fileName }) {
  const { data } = await axios.get(`https://women-info-backend.onrender.com/data/axes/${fileName}`)
  return data.axes
}
export async function getDataByFileName ({ fileName }) {
  const { data } = await axios.get(`https://women-info-backend.onrender.com/data/dataFile${fileName}`)
  return data
}
export async function getFilesNames () {
  const { data } = await axios.get('https://women-info-backend.onrender.com/data/configFiles')
  return data
}
export async function deleteFile ({ id, name, token }) {
  console.log('fucking id', id)
  const authentication = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const { data } = await axios.delete(`https://women-info-backend.onrender.com/data/dataFile/${name}/${id}`, authentication)
  return data
}
export async function updateConfigFile ({ id, body, token }) {
  const authentication = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const { data } = await axios.put(`https://women-info-backend.onrender.com/data/configFiles/${id}`, body, authentication)
  return data
}

export async function updateWeighing ({ weighing, token }) {
  const body = { weighing }
  const authentication = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const { data } = await axios.put('https://women-info-backend.onrender.com/data/weighing', body, authentication)
  return data
}

export async function getWeighing () {
  const { data } = await axios.get('https://women-info-backend.onrender.com/data/weighing')
  return data
}

export async function postWeighing ({ weighing, token }) {
  const body = { weighing }
  const authentication = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const { data } = await axios.post('https://women-info-backend.onrender.com/data/weighing/data', body, authentication)
  return data
}
