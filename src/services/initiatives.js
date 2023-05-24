import axios from 'axios'
import { url } from '../consts'
const basicUrl = `${url}/initiative`
export async function sendInitiative (initiative, { token }) {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const response = await axios.post(basicUrl, initiative, config)
  console.log('la responseeeeee', response)
  return response
}
export async function getAllIniciatives () {
  const response = await axios.get(basicUrl)
  return response
}
export async function getFilteredIniciatives ({ filters }) {
  const { comunidadAutonoma, active, validated } = filters
  const response = await axios.get(`${url}/initiative/${comunidadAutonoma}/${active}/${validated}`)
  return response
}
export async function deleteIniciative ({ id, token }) {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    },
    data: {
      id
    }
  }
  const response = await axios.delete(`${url}/initiative`, config)
  return response
}
export async function updateIniciative ({ id, token, validated, initiativeName, active, link, contacto }) {
  axios.patch(`${url}/initiative`, { id, validated, active, initiativeName, link, contacto }, { headers: { Authorization: 'Bearer ' + token } })
    .then(response => {
    })
    .catch(error => {
      console.log(error)
    })
}
