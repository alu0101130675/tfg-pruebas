import React, { useContext, useEffect } from 'react'
// import validator from 'validator'
import { sendInitiative, deleteIniciative, updateIniciative } from '../services/initiatives'
import './css/InitiativeForm.css'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../context/UserContext'
import { ConfirmMessage } from './ConfirmMessage'
import { useTrigger } from '../hooks/useTrigger'

function InitiativeForm ({ LocationData, setInitiativeAdded, setLocationData, updateFlag, setUpdateFlag }) {
  const [confirmDelete, setConfirmDelete] = useTrigger(false)
  const navigate = useNavigate()
  const { user } = useContext(UserContext)
  useEffect(() => {
    const LocationDataForm = window.localStorage.getItem('locationData')
    if (LocationDataForm != null) {
      const locationJson = JSON.parse(LocationDataForm)
      setLocationData(locationJson)
    }
  }, [])

  const handleFormChange = e => {
    setLocationData({
      ...LocationData,
      [e.target.name]: e.target.value
    })
  }
  const handleFormCheck = e => {
    const targetName = e.target.name
    const prevValue = LocationData[targetName]
    setLocationData({
      ...LocationData,
      [targetName]: !prevValue
    })
  }
  const handleFormSubmit = async e => {
    e.preventDefault()
    try {
      const locationDataString = JSON.stringify(LocationData)
      window.localStorage.setItem('locationData', locationDataString)
      const response = await sendInitiative(LocationData, { token: user.token })

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
  const handledDeleteIniciative = () => {
    const { id, initiativeName } = LocationData
    deleteIniciative({ id, token: user.token }).then((response) => console.log(response)).catch((err) => console.log({ err }))
  }
  const handleUpdateIniciative = () => {
    const { id, initiativeName, validated, active, link, contacto } = LocationData
    updateIniciative({ id, active, validated, initiativeName, token: user.token, link, contacto }).then((response) => console.log(response)).catch((err) => console.log({ err }))
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
        <label htmlFor='contacto'>Email</label>
        <input
          className='form-input'
          type='email'
          id='contacto'
          name='contacto'
          value={LocationData.contacto}
          onChange={handleFormChange}

        />
      </div>
      <div className='form-field'>
        <label htmlFor='initiative-name'>Nombre de la iniciativa</label>
        <input
          className='form-input'
          type='text'
          id='initiativeName'
          name='initiativeName'
          required
          value={LocationData.initiativeName}
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
          className='form-input'
          type='url'
          id='link'
          name='link'
          value={LocationData.link}
          onChange={handleFormChange}
        />
      </div>
      {updateFlag &&
        <div className='pararel-buttons'>
          <label className='intiative-labels' htmlFor='validated'>Validada</label>
          <input
            className='form-input'
            required
            type='checkbox'
            id='validated'
            name='validated'
            onChange={handleFormCheck}
            checked={LocationData.validated}
          />
          <label htmlFor='active' className='intiative-labels'>Activa</label>
          <input
            required
            className='form-input'
            type='checkbox'
            id='active'
            name='active'
            onChange={handleFormCheck}
            checked={LocationData.active}
          />
        </div>}
      {updateFlag
        ? (
          <div className='pararel-buttons'>
            <button
              className='submit-button'
              disabled={!isFormValid()}
              type='button'
              onClick={() => {
                handleUpdateIniciative()
                setUpdateFlag()
              }}
            >
              Actualizar
            </button>
            <button
              className='delete-button'
              disabled={!isFormValid()}
              type='button'
              onClick={setConfirmDelete}
            >
              Eliminar
            </button>
            {confirmDelete &&
              <ConfirmMessage
                message='Seguro que quieres eliminar esta iniciativa'
                showMessage={setConfirmDelete}
                action={() => {
                  handledDeleteIniciative()
                  setUpdateFlag()
                }}
              />}
          </div>)
        : (
          <button className='submit-button' type='submit' disabled={!isFormValid()}>
            Publicar iniciativa
          </button>)}
    </form>

  )
}
export default InitiativeForm
