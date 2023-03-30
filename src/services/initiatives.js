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
  const { comunidadAutonoma, active, validated } = filters
  const response = await axios.get(`http://localhost:3001/initiative/${comunidadAutonoma}/${active}/${validated}`)
  console.log({ response })
  return response
}
export async function deleteIniciative ({ id, token }) {
  console.log('deletes')
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    },
    data: {
      id
    }
  }
  const response = await axios.delete('http://localhost:3001/initiative', config)
  return response
}
export async function updateIniciative ({ id, token, validated, initiativeName, active, link, contacto }) {
  axios.patch('http://localhost:3001/initiative', { id, validated, active, initiativeName, link, contacto }, { headers: { Authorization: 'Bearer ' + token } })
    .then(response => {
      console.log(response.data)
    })
    .catch(error => {
      console.log(error)
    })
}
