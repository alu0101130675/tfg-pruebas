
import { MapContainer, TileLayer, Popup, Marker, useMap } from 'react-leaflet'
import '../InitiativeMap.css'
import { InitiativeForm } from './InitiativeForm'
import { Navbar } from './Navbar'
export function InitiativeMap () {
  function SetViewOnClick ({ coords }) {
    const map = useMap()
    map.setView(coords, map.getZoom())

    return null
  }
  const position = [41.0, -4]
  return (
    <>
      <Navbar />
      <div className='map-form'>
        <MapContainer className='map-container' center={position} zoom={4} scrollWheelZoom={false}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          />
          <SetViewOnClick coords={[30.0, -4]} />

          <Marker position={position}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        </MapContainer>
        <InitiativeForm className='form' />
      </div>

    </>

  )
}
