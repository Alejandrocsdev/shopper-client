import { createContext, useState } from 'react'

const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({})
  const [sign, setSign] = useState(null)

  if (sign === null) {
    console.log('未登入')
  } else if (sign === false) {
    console.log('已登出')
  } else {
    console.log('登入中')
  }

  return (
    <AuthContext.Provider value={{ auth, setAuth, sign, setSign }}>{children}</AuthContext.Provider>
  )
}

export default AuthContext
