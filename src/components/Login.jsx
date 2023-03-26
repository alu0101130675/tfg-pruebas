import { useState } from 'react'
import { login, signup } from '../services/login'
import '../Login.css'
import { Link, useLocation, useNavigate } from 'react-router-dom'
export function Login () {
  const navigate = useNavigate()
  const [loginFlag, setLoginFlag] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [error, setError] = useState(null)
  const location = useLocation()
  const { state } = location
  const fromPath = state?.from || '/'

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const response = loginFlag ? await login({ email, password }) : await signup({ email, password })
      console.log(response)
      if (response.message) {
        setError(response.message)
        setEmail('')
        setPassword('')
      } else {
        response.token && window.sessionStorage.setItem('token', response.token)
        setUser(response)
        navigate(fromPath)
      }
    } catch (error) {
      const errorStatus = error.response.status
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
