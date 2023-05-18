import { useContext, useEffect, useState } from 'react'
import './css/Navbar.css'
import { Link, useNavigate } from 'react-router-dom'
import { DropDown } from './DropDown'
import { HamburgerButton } from './HamburgerButton'
import { UserContext } from '../context/UserContext'
import { ConfirmMessage } from './ConfirmMessage'
import { useTrigger } from '../hooks/useTrigger'
import { deleteAccount } from '../services/login'
import { toast } from 'react-hot-toast'
export function Navbar ({ defaultFiles }) {
  const navigate = useNavigate()
  const { user, setToken } = useContext(UserContext)
  const [toogleBar, setToogleBar] = useTrigger(false)
  const [showDeleteMessage, setShowDeleteMessage] = useTrigger(false)
  const [files, setFiles] = useState([{ visual: 'Estamos subiendo los ficheros' }])
  useEffect(() => {
    const fileList = defaultFiles?.map(({ collectionName }) => {
      return {
        visual: collectionName,
        navigation: collectionName
      }
    })
    fileList && setFiles(fileList)
  }, [defaultFiles])
  const logOut = () => {
    setToken({ token: null })
    window.sessionStorage.removeItem('token')
    window.sessionStorage.removeItem('role')
    toast.success('sesión cerrada')
    navigate('/login')
  }

  const LOGGED_OPTIONS = [
    {
      visual: 'Eliminar Cuenta',
      action: setShowDeleteMessage,
      navigation: '#'
    },
    {
      visual: 'Cerrar Sesión',
      action: logOut,
      navigation: '#'
    }]

  return (
    <>
      <nav className='navbar'>
        <div className='navbar-items-logo'>
          <Link to='/' className='logo'>
            <img
              src='https://www.women-inf.eu/wp-content/uploads/2022/05/cropped-identidad_grafica_WOMEN@INF-isologo.png'
              alt='logo de women@info'
            />
          </Link>
          <div className={`navbar-items ${toogleBar ? 'show-links' : ''}`}>
            <DropDown dropDownItems={files} anchor={window.outerWidth < 600 ? '#' : '/'} dropDownName='Grafica' />
            {window.outerWidth < 600 && <DropDown
              dropDownItems={user.token != null ? LOGGED_OPTIONS : []}
              anchor={user.token != null ? '#' : '/login'}
              dropDownName='Mi cuenta'
                                        />}
            <div>
              <Link to='/InitiativeMap' className='nav-link'>Iniciativas</Link>
            </div>
            {user.role === 'admin' &&
              <div>
                <Link to='/Administrador' className='nav-link'>Administrador</Link>
              </div>}
          </div>
        </div>
        <HamburgerButton setToogleBar={setToogleBar} className='hamburger-icon' />
        {window.outerWidth > 600 && <DropDown
          dropDownItems={user.token != null ? LOGGED_OPTIONS : []}
          anchor='/login'
          dropDownName='Mi cuenta'
          side='right'
                                    />}
      </nav>
      {showDeleteMessage &&
        <ConfirmMessage
          message='¿Seguro que deseas eliminar la cuenta?'
          showMessage={setShowDeleteMessage}
          action={() => { deleteAccount(user.token).then(res => console.log(res)).catch(e => console.log(e)) }}
        />}
    </>

  )
}
