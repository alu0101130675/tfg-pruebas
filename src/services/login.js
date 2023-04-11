import axios from 'axios'
export async function login (credentials) {
  const { data } = await axios.post('https://women-info-backend.onrender.com/login', credentials)
  return data
}
export async function signup (credentials) {
  const { data } = await axios.post('https://women-info-backend.onrender.com/user', credentials)
  console.log('sign up response', { data })
  return data
}
export async function checkRole (token) {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const { data } = await axios.get('https://women-info-backend.onrender.com/user/role', config)
  return data
}
export async function deleteAccount (credentials) {
  const config = {
    headers: {
      Authorization: `Bearer ${credentials}`
    }
  }
  const { data } = await axios.delete('https://women-info-backend.onrender.com/user', config)
  console.log('erspuesa', data)
  return data
}
