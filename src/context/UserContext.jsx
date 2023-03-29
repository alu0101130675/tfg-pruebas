import { createContext, useState } from 'react'
export const UserContext = createContext()
export function UserProvider ({ children }) {
  const [user, setToken] = useState(
    {
      token: window.sessionStorage.getItem('token'),
      role: window.sessionStorage.getItem('role')
    })
  return (
    <UserContext.Provider value={{ user, setToken }}>
      {children}
    </UserContext.Provider>
  )
}
