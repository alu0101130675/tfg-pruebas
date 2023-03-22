import React, { useState } from 'react'
import validator from 'validator'
import { sendInitiative } from '../services/initiatives'
import '../InitiativeForm.css'

export function InitiativeForm () {
  const [formData, setFormData] = useState({
    email: '',
    location: '',
    validated: 'false',
    link: '',
    expirationDate: ''
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
      const response = await sendInitiative(formData, { token })
      console.log('LA REPSUESTA', response)
    } catch (error) {
      console.log(error)
    }
  }

  const isFormValid = () => {
    if (!formData.email || !formData.location) {
      return false
    }
    if (formData.email && !validator.isEmail(formData.email)) {
      return false
    }
    return true
  }

  return (
    <form onSubmit={handleFormSubmit} className='form'>
      <div className='form-field'>
        <label htmlFor='email'>Email</label>
        <input
          type='email'
          id='email'
          name='email'
          value={formData.email}
          onChange={handleFormChange}
        />
      </div>
      <div className='form-field'>
        <label htmlFor='location'>Location:</label>
        <input
          type='text'
          id='location'
          name='location'
          value={formData.location}
          onChange={handleFormChange}
        />
      </div>
      <div className='form-field'>
        <label htmlFor='link'>Link</label>
        <input
          type='text'
          id='link'
          name='link'
          value={formData.link}
          onChange={handleFormChange}
        />
      </div>
      <div className='form-field'>
        <label htmlFor='expirationDate'>Expiration Date</label>
        <input
          type='date'
          id='expirationDate'
          name='expirationDate'
          value={formData.expirationDate}
          onChange={handleFormChange}
        />
      </div>
      <button type='submit' disabled={!isFormValid()}>
        Submit
      </button>
    </form>
  )
}