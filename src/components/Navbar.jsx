import { useContext, useState } from 'react'
import '../Navbar.css'
import { Link, useNavigate } from 'react-router-dom'
import { DropDown } from './DropDown'
import { HamburgerButton } from './HamburgerButton'
// import { LOGGED_OPTIONS } from '../consts'
import { UserContext } from '../context/UserContext'
import { ConfirmMessage } from './DeleteAccountMessage'
import { useTrigger } from '../hooks/useTrigger'
export function Navbar () {
  const navigate = useNavigate()
  const { user, setToken } = useContext(UserContext)
  console.log(user)
  const [toogleBar, setToogleBar] = useState(false)
  const [showDeleteMessage, setShowDeleteMessage] = useTrigger(false)
  const dropdownItems = [{ visual: 'graficas' }, { visual: 'van con un usefect' }]
  const logOut = () => {
    setToken({ token: null })
    window.sessionStorage.removeItem('token')
    window.sessionStorage.removeItem('role')
    navigate('/login')
  }

  const LOGGED_OPTIONS = [
    {
      visual: 'Eliminar Cuenta',
      action: setShowDeleteMessage
    },
    {
      visual: 'Cerrar Sesión',
      action: logOut
    }]

  return (
    <>
      <nav className='navbar'>
        <div className='navbar-items-logo'>
          <div className='logo'>
            <img
              src='https://www.women-inf.eu/wp-content/uploads/2022/05/cropped-identidad_grafica_WOMEN@INF-isologo.png'
              alt='logo de women@info'
            />
          </div>
          <div className={`navbar-items ${toogleBar ? 'show-links' : ''}`}>
            <DropDown dropDownItems={dropdownItems} anchor='/' dropDownName='Grafica' />
            <div>
              <Link to='/InitiativeMap' className='nav-link'>Iniciativas</Link>
            </div>
          </div>
        </div>
        <HamburgerButton className='hamburger-icon' />
        <DropDown
          dropDownItems={user.token != null ? LOGGED_OPTIONS : []}
          anchor='/login'
          dropDownName='Mi cuenta'
          side='right'
        />
      </nav>
      {showDeleteMessage && <ConfirmMessage message='¿Seguro que deseas eliminar la cuenta?' showMessage={setShowDeleteMessage} />}
    </>

  )
}
