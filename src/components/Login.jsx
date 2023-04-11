import { useContext, useState } from 'react'
import { login, signup } from '../services/login'
import './css/Login.css'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { UserContext } from '../context/UserContext'
import { useTrigger } from '../hooks/useTrigger'
function Login () {
  const navigate = useNavigate()
  const [loginFlag, setLoginFlag] = useTrigger(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { _, setToken } = useContext(UserContext)
  const [error, setError] = useState(null)
  const location = useLocation()
  const { state } = location
  const fromPath = state?.from || '/'

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const response = loginFlag ? await login({ email, password }) : await signup({ email, password })
      if (response.message) {
        setError(response.message)
        setEmail('')
        setPassword('')
      } else {
        if (response.token) {
          window.sessionStorage.setItem('token', response.token)
          window.sessionStorage.setItem('role', response.role)
        } setToken(response)
        navigate(fromPath)
      }
    } catch (error) {
      const errorStatus = error?.response?.status
      if (errorStatus === 409) {
        setError('Usuario no valido')
      }
    }
  }
  return (
    <div>
      <h1>{loginFlag ? 'Log in' : 'Sign up'} to Women Info</h1>
      {error && <h3 className='error'>{error}</h3>}
      <form className='form-container' onSubmit={(event) => handleLogin(event)}>
        <input name='email' placeholder='Email' type='email' value={email} onChange={({ target }) => setEmail(target.value)} />
        <input autoFocus type='password' placeholder='Password' value={password} onChange={({ target }) => setPassword(target.value)} />
        <button className='login-button'>{loginFlag ? 'Log in' : 'Sign up'}</button>
        <div>
          ¿{loginFlag
          ? 'No tienes cuenta'
          : 'Ya tienes una cuenta'}?
          <Link
            className='link-creta-account' onClick={() => {
              setLoginFlag(!loginFlag)
              setError(null)
            }}
          >{loginFlag
            ? 'Crea una'
            : 'Inicia sesión'}
          </Link>
        </div>
      </form>
    </div>

  )
}
export default Login
