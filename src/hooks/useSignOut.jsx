import axios from '../api/axios'
import useAuth from './useAuth'
import { useError } from '../contexts/ErrorContext'
import { useNavigate, useLocation } from 'react-router-dom'

const useSignOut = () => {
  // 全域錯誤訊息
  const { setErrMsg } = useError()
  const handleError = (message) => setErrMsg(message)

  // 導向
  const navigate = useNavigate()
  const location = useLocation()

  const { setAuth, setSign } = useAuth()

  const signOut = async () => {
    setAuth({})
    setSign(false)
    try {
      await axios('/auth/signOut', {
        withCredentials: true
      })
      if (location.pathname !== '/') {
        navigate('/signIn')
      }
    } catch (err) {
      handleError('登出失敗')
    }
  }

  return signOut
}

export default useSignOut
