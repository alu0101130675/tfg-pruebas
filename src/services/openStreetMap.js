import axios from 'axios'

export async function location ({ lat, lng }) {
  console.log(lat, lng)
  const apiOpenStreetMapReverse =
 `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}&accept-language=es`
  console.log(apiOpenStreetMapReverse)
  const { data } = await axios.get(apiOpenStreetMapReverse)
  console.log({ data })
  return data
}
