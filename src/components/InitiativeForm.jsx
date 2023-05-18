import React, { useContext, useEffect } from 'react'
import { sendInitiative, deleteIniciative, updateIniciative } from '../services/initiatives'
import './css/InitiativeForm.css'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../context/UserContext'
import { ConfirmMessage } from './ConfirmMessage'
import { useTrigger } from '../hooks/useTrigger'
import { toast } from 'react-hot-toast'

function InitiativeForm ({ LocationData, setLocationData, updateFlag, setUpdateFlag }) {
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
    const initiative = { ...LocationData, active: false, validated: false }
    setLocationData(initiative)
    e.preventDefault()
    const locationDataString = JSON.stringify(initiative)
    window.localStorage.setItem('locationData', locationDataString)
    toast.promise(
      sendInitiative(initiative, { token: user.token }),
      {
        loading: 'Subiendo fichero...',
        success: () => {
          window.localStorage.removeItem('formData')
          window.localStorage.removeItem('locationData')
          return <b>Se mostrará una vez validada</b>
        },
        error: (error) => {
          const messageError = error.response.data.message
          console.log(error)
          if (messageError) {
            if (messageError === 'token is missing or invalid') {
              const currentPath = window.location.pathname
              navigate('/login', { state: { from: currentPath } })
              return (<b>No se pudo enviar,Inicie sesión</b>)
            } else {
              console.log('problemas con el servidor')
              return (<b>No se pudo enviar</b>)
            }
          }
        }
      },
      { success: { duration: 4000 } }
    )
  }

  const handledDeleteIniciative = () => {
    const { id } = LocationData
    toast.promise(
      deleteIniciative({ id, token: user.token }),
      {
        loading: 'eliminando Iniciativa...',
        success: <b>Iniciativa eliminada</b>,
        error: (error) => {
          console.log(error)
          return (<b>No se pudo eliminar</b>)
        }
      }
    )
  }
  const handleUpdateIniciative = () => {
    const { id, initiativeName, validated, active, link, contacto } = LocationData
    toast.promise(
      updateIniciative({ id, active, validated, initiativeName, token: user.token, link, contacto }),
      {
        loading: 'actualizando iniciativa...',
        success: <b>Iniciativa actualizada</b>,
        error: (error) => {
          console.log(error)
          return (<b>No se pudo actualizar</b>)
        }
      }
    )
  }

  return (
    <form onSubmit={handleFormSubmit} className='form'>
      <div className='form-field'>
        <label className='form-label' htmlFor='contacto'>Email</label>
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
        <label className='form-label' htmlFor='initiative-name'>Nombre de la iniciativa</label>
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
        <label className='form-label' htmlFor='location'>Location</label>
        <input
          className='form-input'
          type='text'
          id='location'
          name='location'
          required
          readOnly
          value={LocationData.location}
        />
      </div>
      <div className='form-field'>
        <label className='form-label' htmlFor='link'>Link</label>
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
          <label className='form-label' htmlFor='active' className='intiative-labels'>Activa</label>
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
          <button className='submit-button' type='submit'>
            Publicar iniciativa
          </button>)}
    </form>
  )
}
export default InitiativeForm
