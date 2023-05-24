import axios from 'axios'
import { url } from '../consts'
export async function login (credentials) {
  const { data } = await axios.post(`${url}/login`, credentials)
  return data
}
export async function signup (credentials) {
  const { data } = await axios.post(`${url}/user`, credentials)
  return data
}
export async function checkRole (token) {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const { data } = await axios.get(`${url}/user/role`, config)
  return data
}
export async function deleteAccount (credentials) {
  const config = {
    headers: {
      Authorization: `Bearer ${credentials}`
    }
  }
  const { data } = await axios.delete(`${url}/user`, config)
  return data
}
