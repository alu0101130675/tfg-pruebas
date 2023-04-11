import axios from 'axios'

export async function location ({ lat, lng }) {
  const apiOpenStreetMapReverse =
 `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}&accept-language=es`
  const { data } = await axios.get(apiOpenStreetMapReverse)
  return data
}
