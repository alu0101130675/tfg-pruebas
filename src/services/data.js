import axios from 'axios'
import { url } from '../consts'
export async function postFile ({ token, name, documentData, config, axes, description }) {
  const authentication = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const { data } = await axios
    .post(`${url}/data/${name}`, { documentData, config, axes, description }, authentication)
  return data
}
export async function getFileNameWithoutId () {
  const { data } = await axios.get(`${url}/data/fileNames`)
  return data
}
export async function getConfigFile ({ fileName, idFlag }) {
  const { data } = await axios.get(`${url}/data/configField/${fileName}/${idFlag}`)
  return data
}
export async function getOptions ({ fileName }) {
  const { data } = await axios.get(`${url}/data/axes/${fileName}`)
  return data.axes
}
export async function getDataByFileName ({ fileName }) {
  const { data } = await axios.get(`${url}/data/dataFile${fileName}`)
  return data
}
export async function getFilesNames () {
  const { data } = await axios.get(`${url}/data/configFiles`)
  return data
}
export async function deleteFile ({ id, name, token }) {
  console.log('fucking id', id)
  const authentication = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const { data } = await axios.delete(`${url}/data/dataFile/${name}/${id}`, authentication)
  return data
}
export async function updateConfigFile ({ id, body, token }) {
  const authentication = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const { data } = await axios.put(`${url}/data/configFiles/${id}`, body, authentication)
  return data
}

export async function updateWeighing ({ weighing, token }) {
  const body = { weighing }
  const authentication = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const { data } = await axios.put(`${url}/data/weighing`, body, authentication)
  return data
}

export async function getWeighing () {
  const { data } = await axios.get(`${url}/data/weighing`)
  return data
}

export async function postWeighing ({ weighing, token }) {
  const body = { weighing }
  const authentication = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const { data } = await axios.post(`${url}/data/weighing/data`, body, authentication)
  return data
}
