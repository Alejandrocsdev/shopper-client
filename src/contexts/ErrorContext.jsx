import { createContext, useState, useContext } from 'react'

const ErrorContext = createContext()

export const useError = () => {
  return useContext(ErrorContext)
}

export const ErrorProvider = ({ children }) => {
  const [errMsg, setErrMsg] = useState('')

  return <ErrorContext.Provider value={{ errMsg, setErrMsg }}>{children}</ErrorContext.Provider>
}
