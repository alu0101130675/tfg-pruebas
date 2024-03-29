
import { MapContainer, TileLayer, Popup, Marker, useMapEvents } from 'react-leaflet'
import { useContext, useEffect, useState, lazy, Suspense } from 'react'
import './css/InitiativeMap.css'
import L from 'leaflet'
import { location } from '../services/openStreetMap'
import { Link } from 'react-router-dom'
import { getFilteredIniciatives } from '../services/initiatives'
import { MapFilter } from './MapFilter'
import { COMUNIDADES_AUTONOMAS } from '../consts'
import { ToogleCheck } from './ToogleCheck'
import { UserContext } from '../context/UserContext'
const InitiativeForm = lazy(() => import('./InitiativeForm'))
const icon = {
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  shadowSize: [41, 41],
  shadowAnchor: [12, 41]
}
function InitiativeMap () {
  const { user } = useContext(UserContext)
  const redIcon = L.icon({
    ...icon,
    className: 'red-icon'
  })
  const blueIcon = L.icon({
    ...icon
  })
  const [filters, setFilters] = useState({ comunidadAutonoma: 'Todas', active: true, validated: true })
  const [position, setPosition] = useState([41.0, -4])
  const [updateFlag, setUpdateFlag] = useState(false)
  const [initiatives, setInitiatives] = useState([])
  const [LocationData, setLocationData] = useState({
    location: 'Seleccione en el mapa la ubicacion',
    id: '',
    contacto: '',
    validated: false,
    initiativeName: '',
    link: '',
    active: false
  })
  const [formFlag, setformFlag] = useState(false)
  useEffect(() => {
    getFilteredIniciatives({ filters }).then(response => {
      setInitiatives(response.data)
    }).catch(error => console.log('error1', { error })
    )
  }, [filters, formFlag, updateFlag])

  function LocationMarker () {
    const map = useMapEvents({
      async click ({ latlng }) {
        const { lat, lng } = latlng
        location(latlng)
          .then(
            ({ display_name, address }) => {
              const { road, city, postcode, state, archipelago } = address
              setLocationData(prevState => ({
                ...prevState,
                location: display_name,
                road,
                city,
                postCode: postcode,
                ComunidadAutonoma: state || archipelago,
                latitude: lat,
                longitude: lng
              }))
            }).catch(e => console.error(e))
        setPosition([lat, lng])
        map.flyTo([lat, lng])
      }
    })
  }

  return (
    <>
      <div className='filters'>
        <div>
          <MapFilter options={COMUNIDADES_AUTONOMAS} setFilter={setFilters} />
        </div>
        <ToogleCheck toogleLabel='Iniciativas activas' setFilter={setFilters} check={filters.active} filter='active' />
        {user.role === 'admin' &&
          <ToogleCheck toogleLabel='Iniciativas validadas' setFilter={setFilters} check={filters.validated} filter='validated' />}

      </div>

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

          {(formFlag && user.role !== 'admin') ||
            initiatives.map(({
              latitude, _id, longitude, initiativeName, contacto,
              validated,
              link,
              active
            }) => {
              return (
                <Marker
                  key={_id}
                  position={[latitude, longitude]}
                  icon={active ? blueIcon : redIcon}
                  eventHandlers={{
                    popupclose: () => { setUpdateFlag(false) },
                    popupopen: () => {
                      if (user.role === 'admin') {
                        setUpdateFlag(true)
                        setLocationData(prevState => ({
                          ...prevState,
                          latitude,
                          id: _id,
                          longitude,
                          initiativeName,
                          contacto,
                          validated,
                          link,
                          active
                        }))
                      }
                    }
                  }}
                >
                  <Popup>
                    <label>Nombre: {initiativeName}</label>
                    <br />
                    <label>Contacto: {contacto}</label>
                    <br />
                    Link:<a href={link}>{link}</a>
                  </Popup>
                </Marker>
              )
            })}
          {formFlag &&
            <Marker position={position}>
              <Popup>
                Ubicacion seleccionada
              </Popup>
            </Marker>}

        </MapContainer>
        {window.outerWidth < 1060 &&
          <Link onClick={() => setformFlag(!formFlag)} className='map-link'>
            {formFlag
              ? 'Volver a mapa completo'
              : 'Publica tu iniciativa'}
          </Link>}
        {formFlag &&
          <Suspense fallback={<div>Loading...</div>}>
            <InitiativeForm
              className='form'
              LocationData={LocationData}
              setLocationData={setLocationData}
              updateFlag={updateFlag}
              setUpdateFlag={setUpdateFlag}
            />
          </Suspense>}

      </div>
      {window.outerWidth > 1060 &&
        <Link onClick={() => setformFlag(!formFlag)} className='map-link'>
          {formFlag
            ? 'Volver a mapa completo'
            : 'Publica tu iniciativa'}
        </Link>}
    </>
  )
}
export default InitiativeMap
