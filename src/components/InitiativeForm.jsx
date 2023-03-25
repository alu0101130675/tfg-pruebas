import React, { useState } from 'react'
import validator from 'validator'
import { sendInitiative } from '../services/initiatives'
import '../InitiativeForm.css'

export function InitiativeForm ({ locationName, LocationData }) {
  const [formData, setFormData] = useState({
    contacto: '',
    validated: false,
    initiativeName: '',
    link: '',
    active: false,
    ComunidadAutonoma: ''
  })

  const handleFormChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleFormSubmit = async e => {
    e.preventDefault()
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im51ZXZvVXN1YXJpb0hhc2hAZ21haWwuY29tIiwiaWQiOiI2NDExZTQ5OTYyMGRmYjI2NTg2NGFjMGIiLCJpYXQiOjE2NzkwNTE0MjB9.7IqGy6KG42Izqvq-y-Qpg0JbbM-QW--Tff_zNMVxWEc'
    try {
      const objectTosend = { ...formData, ...LocationData }
      const response = await sendInitiative(objectTosend, { token })
      console.log('LA REPSUESTA', response)
    } catch (error) {
      console.log(error)
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
