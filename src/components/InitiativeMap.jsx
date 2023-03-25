
import { MapContainer, TileLayer, Popup, Marker, useMapEvents } from 'react-leaflet'
import { useState } from 'react'
import '../InitiativeMap.css'
import { InitiativeForm } from './InitiativeForm'
import { location } from '../services/openStreetMap'
import { Link } from 'react-router-dom'
// const apiOpenStreetMap = 'https://nominatim.openstreetmap.org/ui/search.html?street=tafetana&city=guimar&country=spain&postalcode=38500'
export function InitiativeMap () {
  const [position, setPosition] = useState([41.0, -4])
  const [LocationData, setLocationData] = useState({ location: 'Seleccione en el mapa la ubicacion' })
  const [formFlag, setformFlag] = useState(false)

  function LocationMarker () {
    const map = useMapEvents({
      async click ({ latlng }) {
        const { lat, lng } = latlng
        location(latlng)
          .then(
            ({ display_name, address, city, postcode, state }) => {
              setLocationData({
                location: display_name,
                // address,
                city,
                postcode,
                state,
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

          <Marker position={position}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        </MapContainer>
        {formFlag && <InitiativeForm className='form' LocationData={LocationData} />}
      </div>
      <Link onClick={() => setformFlag(!formFlag)}>
        {formFlag
          ? 'Volver a mapa completo'
          : 'Publica tu iniciativa'}
      </Link>

    </>
  )
}
