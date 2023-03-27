import axios from 'axios'
const basicUrl = 'http://localhost:3001/initiative'

export async function sendInitiative (initiative, { token }) {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const response = await axios.post(basicUrl, initiative, config)
  console.log({ response })
  return response
}
export async function getAllIniciatives () {
  const response = await axios.get(basicUrl)
  console.log({ response })
  return response
}
export async function getFilteredIniciatives ({ filters }) {
  const { comunidadAutonoma, active } = filters
  const response = await axios.get(`http://localhost:3001/initiative/${comunidadAutonoma}/${active}`)
  console.log({ response })
  return response
}
