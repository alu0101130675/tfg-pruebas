import { createContext, useState } from 'react'
export const UserContext = createContext()
export function UserProvider ({ children }) {
  const [token, setToken] = useState({ token: window.sessionStorage.getItem('token') })
  return (
    <UserContext.Provider value={{ token, setToken }}>
      {children}
    </UserContext.Provider>
  )
}
