import axios from 'axios'
const basicUrl = 'http://localhost:3001/login'
export async function login (credentials) {
  const { data } = await axios.post(basicUrl, credentials)
  return data
}
