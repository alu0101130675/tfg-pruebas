import axios from 'axios'
const basicUrl = 'http://localhost:3001/initiative'

export async function sendInitiative (initiative, { token }) {
  const initiativeJson = JSON.stringify(initiative)
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  console.log(config)
  console.log(initiativeJson)
  const { response } = await axios.post(basicUrl, initiativeJson, config)
  return response
}