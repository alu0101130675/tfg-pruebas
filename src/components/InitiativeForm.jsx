import React, { useEffect, useState } from 'react'
import validator from 'validator'
import { sendInitiative } from '../services/initiatives'
import '../InitiativeForm.css'
import { useNavigate } from 'react-router-dom'

export function InitiativeForm ({ LocationData, setInitiativeAdded, setLocationData }) {
  const navigate = useNavigate()
  const [token, SetToken] = useState(window.sessionStorage.getItem('token'))
  const [formData, setFormData] = useState(
    {
      contacto: '',
      validated: false,
      initiativeName: '',
      link: '',
      active: false,
      ComunidadAutonoma: ''
    })
  useEffect(() => {
    console.log('entra')
    const initiativeForm = window.localStorage.getItem('formData')
    const LocationDataForm = window.localStorage.getItem('locationData')

    if (initiativeForm != null && LocationDataForm != null) {
      const initiativeJson = JSON.parse(initiativeForm)
      const locationJson = JSON.parse(LocationDataForm)
      console.log({ initiativeJson })
      console.log({ locationJson })
      setFormData(initiativeJson)
      setLocationData(locationJson)
    }
  }, [])

  const handleFormChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleFormSubmit = async e => {
    e.preventDefault()
    try {
      const objectTosend = { ...formData, ...LocationData }
      const formDataString = JSON.stringify(formData)
      const locationDataString = JSON.stringify(LocationData)
      window.localStorage.setItem('formData', formDataString)
      window.localStorage.setItem('locationData', locationDataString)
      const response = await sendInitiative(objectTosend, { token })

      if (response.status === 200) {
        setInitiativeAdded(true)
        window.localStorage.removeItem('formData')
        window.localStorage.removeItem('locationData')
      } else {
        setInitiativeAdded(false)
      }
    } catch (error) {
      const messageError = error.response.data.message
      if (messageError) {
        if (messageError === 'token is missing or invalid') {
          const currentPath = window.location.pathname
          navigate('/login', { state: { from: currentPath } })
        } else {
          console.log('problemas con el servidor')
        }
      }
    }
  }

  const isFormValid = () => {
    // if (!formData.contacto || !formData.location) {
    //   return false
    // }
    // if (formData.contacto && !validator.isEmail(formData.contacto)) {
    //   return false
    // }
    return true
  }

  return (
    <form onSubmit={handleFormSubmit} className='form'>
      <div className='form-field'>
        <label htmlFor='email'>Email</label>
        <input
          type='email'
          id='contacto'
          name='contacto'
          value={formData.contacto}
          onChange={handleFormChange}
        />
      </div>
      <div className='form-field'>
        <label htmlFor='initiative-name'>Nombre de la iniciativa</label>
        <input
          type='text'
          id='initiativeName'
          name='initiativeName'
          required
          value={formData.initiativeName}
          onChange={handleFormChange}
        />
      </div>
      <div className='form-field'>
        <label htmlFor='location'>Location</label>
        <input
          type='text'
          id='location'
          name='location'
          required
          readOnly
          value={LocationData.location}
        />
      </div>
      <div className='form-field'>
        <label htmlFor='link'>Link</label>
        <input
          type='url'
          id='link'
          name='link'
          value={formData.link}
          onChange={handleFormChange}
        />
      </div>
      {/* <div className='form-field'> ACTIVA Y SOLO AL ADMIN SE LE MUESTRA ESTE CAMPO
    <label htmlFor='expirationDate'>Expiration Date</label>
    <input
      required
      type='date'
      id='expirationDate'
      name='expirationDate'
      value={formData.expirationDate}
      onChange={handleFormChange}
    />
  </div> */}
      <button className='submit-button' type='submit' disabled={!isFormValid()}>
        Publicar iniciativa
      </button>
    </form>

  )
}
