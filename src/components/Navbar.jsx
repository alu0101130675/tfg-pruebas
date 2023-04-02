import { useContext, useEffect, useState } from 'react'
import './css/Navbar.css'
import { Link, useNavigate } from 'react-router-dom'
import { DropDown } from './DropDown'
import { HamburgerButton } from './HamburgerButton'
import { UserContext } from '../context/UserContext'
import { ConfirmMessage } from './ConfirmMessage'
import { useTrigger } from '../hooks/useTrigger'
import { getFileNames } from '../services/data'
export function Navbar () {
  const navigate = useNavigate()
  const { user, setToken } = useContext(UserContext)
  const [toogleBar, setToogleBar] = useState(false)
  const [showDeleteMessage, setShowDeleteMessage] = useTrigger(false)
  const [files, setFiles] = useState([{ visual: 'Estamos subiendo los ficheros' }])
  useEffect(() => {
    getFileNames()
      .then(d => {
        const fileList = d.map(({ collectionName }) => {
          return { visual: collectionName }
        }
        )
        setFiles(fileList)
      })
      .catch(err => console.log(err))
  }, [])
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
            <DropDown dropDownItems={files} anchor='/' dropDownName='Grafica' />
            <div>
              <Link to='/InitiativeMap' className='nav-link'>Iniciativas</Link>
            </div>
            {user.role === 'admin' &&
              <div>
                <Link to='/Administrador' className='nav-link'>Administrador</Link>
              </div>}
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
