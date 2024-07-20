import axios from '../api/axios'
import useAuth from './useAuth'
import useSignOut from './useSignOut'

const useRefreshToken = () => {
  const { setAuth, setSign } = useAuth()
  const signOut = useSignOut()

  const refresh = async () => {
    try {
      const response = await axios.get('/auth/refresh', {
        withCredentials: true
      })
      setAuth({ accessToken: response.data.result })
      setSign(true)
      return response.data.result
    } catch (err) {
      console.log('刷新憑證過期')
      await signOut()
    }
  }
  return refresh
}

export default useRefreshToken
