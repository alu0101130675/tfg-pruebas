import axios from 'axios'
export async function login (credentials) {
  const { data } = await axios.post('http://localhost:3001/login', credentials)
  return data
}
export async function signup (credentials) {
  const { data } = await axios.post('http://localhost:3001/user', credentials)
  return data
}
