import { useState } from 'react'
import { login } from '../services/login'
import '../Login.css'
import { Link } from 'react-router-dom'

export function Login () {
  const [loginFlag, setLoginFlag] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const response = await login({ email, password })
      console.log(response)
      setUser(response)
      setEmail('')
      setPassword('')
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div>
      <h1>{loginFlag ? 'Sign' : 'Log'} in to Women Info</h1>
      <form className='form-container' onSubmit={(event) => handleLogin(event)}>
        <input name='email' placeholder='Email' type='email' value={email} onChange={({ target }) => setEmail(target.value)} />
        <input autoFocus type='password' placeholder='Password' value={password} onChange={({ target }) => setPassword(target.value)} />
        <button className='login-button'>Log in</button>
        <div>
          ¿{loginFlag
          ? 'No tienes cuenta'
          : 'Ya tienes una cuenta'}?
          <Link className='link-creta-account' onClick={() => setLoginFlag(!loginFlag)}>{loginFlag
            ? 'Crea una'
            : 'Inicia sesión'}
          </Link>
        </div>
      </form>
    </div>

  )
}
