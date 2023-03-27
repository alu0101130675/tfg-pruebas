
import { MapContainer, TileLayer, Popup, Marker, useMapEvents } from 'react-leaflet'
import { useEffect, useState } from 'react'
import '../InitiativeMap.css'
import L from 'leaflet'
import { InitiativeForm } from './InitiativeForm'
import { location } from '../services/openStreetMap'
import { Link } from 'react-router-dom'
import { getFilteredIniciatives } from '../services/initiatives'
import { MapFilter } from './MapFilter'
import { COMUNIDADES_AUTONOMAS } from '../consts'
import { ToogleCheck } from './ToogleCheck'
const icon = {
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  shadowSize: [41, 41],
  shadowAnchor: [12, 41]
}
// const apiOpenStreetMap = 'https://nominatim.openstreetmap.org/ui/search.html?street=tafetana&city=guimar&country=spain&postalcode=38500'
export function InitiativeMap () {
  const redIcon = L.icon({
    ...icon,
    className: 'red-icon'
  })
  const blueIcon = L.icon({
    icon
  })
  const [filters, setFilters] = useState({ comunidadAutonoma: 'Todas', active: true })
  const [position, setPosition] = useState([41.0, -4])
  const [initiatives, setInitiatives] = useState([])
  const [LocationData, setLocationData] = useState({ location: 'Seleccione en el mapa la ubicacion' })
  const [formFlag, setformFlag] = useState(false)
  const [initiativeAdded, setInitiativeAdded] = useState(false)
  useEffect(() => {
    getFilteredIniciatives({ filters }).then(response => {
      setInitiatives(response.data)
    }).catch(error => console.log('error1', { error })
    )
  }, [filters])

  function LocationMarker () {
    const map = useMapEvents({
      async click ({ latlng }) {
        const { lat, lng } = latlng
        location(latlng)
          .then(
            ({ display_name, address }) => {
              const { road, city, postcode, state, archipelago } = address
              setLocationData({
                location: display_name,
                road,
                city,
                postCode: postcode,
                ComunidadAutonoma: state || archipelago,
                latitude: lat,
                longitude: lng
              })
            }).catch(e => console.error(e))
        setPosition([lat, lng])
        map.flyTo([lat, lng])
      }
    })
  }

  return (
    <>
      <MapFilter options={COMUNIDADES_AUTONOMAS} setFilter={setFilters} />
      <ToogleCheck setFilter={setFilters} />
      <div className='map-form'>
        <MapContainer
          className={`map-container ${formFlag ? '' : 'max-width'}`}
          center={position} zoom={4}
          scrollWheelZoom
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          />
          <LocationMarker />

          {initiatives.map(({ latitude, id, longitude, initiativeName, active }) => {
            console.log(latitude, longitude)
            return (
              <Marker key={id} position={[latitude, longitude]} icon={active ? blueIcon : redIcon}>
                <Popup>
                  Nombre{initiativeName}. <br /> Contacto:.
                </Popup>
              </Marker>
            )
          })}

        </MapContainer>
        {formFlag && <InitiativeForm className='form' LocationData={LocationData} setInitiativeAdded={setInitiativeAdded} setLocationData={setLocationData} />}
      </div>
      <Link onClick={() => setformFlag(!formFlag)}>
        {formFlag
          ? 'Volver a mapa completo'
          : 'Publica tu iniciativa'}
      </Link>
      {initiativeAdded && <h1>¡Iniciativa añadida!</h1>}
    </>
  )
}
