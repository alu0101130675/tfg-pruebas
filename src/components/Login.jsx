import { useState } from 'react'
import { login } from '../services/login'

export function Login () {
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
    <form onSubmit={(event) => handleLogin(event)}>
      <input name='email' placeholder='email' type='email' value={email} onChange={({ target }) => setEmail(target.value)} />
      <input type='password' value={password} onChange={({ target }) => setPassword(target.value)} />
      <button>login</button>
    </form>
  )
}
