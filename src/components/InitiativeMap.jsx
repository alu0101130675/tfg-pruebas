
import { MapContainer, TileLayer, Popup, Marker, useMapEvents } from 'react-leaflet'
import { useState } from 'react'
import '../InitiativeMap.css'
import { InitiativeForm } from './InitiativeForm'
import { Navbar } from './Navbar'
import { location } from '../services/openStreetMap'
// const apiOpenStreetMap = 'https://nominatim.openstreetmap.org/ui/search.html?street=tafetana&city=guimar&country=spain&postalcode=38500'
export function InitiativeMap () {
  const [position, setPosition] = useState([41.0, -4])
  const [locationName, setLocation] = useState('selecciona en el mapa la ubicacion')

  function LocationMarker () {
    const map = useMapEvents({
      async click ({ latlng }) {
        const { lat, lng } = latlng
        location(latlng)
          .then(({ display_name, address }) => {
            console.log(display_name, address)
            setLocation(display_name)
          }).catch(e => console.error(e))
        setPosition([lat, lng])
        map.flyTo([lat, lng])
      }
    })
  }

  return (
    <>
      <Navbar />
      <div className='map-form'>
        <MapContainer
          className='map-container'
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
        <InitiativeForm className='form' locationName={locationName} setLocation={setLocation} />
      </div>

    </>
  )
}
