import axios from 'axios'
const basicUrl = 'http://localhost:3001/initiative'

export async function sendInitiative (initiative, { token }) {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const { response } = await axios.post(basicUrl, initiative, config)
  return response
}
