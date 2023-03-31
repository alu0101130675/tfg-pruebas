import axios from 'axios'
export async function postFile ({ token, name = 'pruebita', documentData }) {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const { data } = await axios.post(`http://localhost:3001/data/${name}`, documentData, config)
  return data
}
