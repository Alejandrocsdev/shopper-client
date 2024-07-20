import { axiosPrivate } from '../api/axios'
import { useEffect } from 'react'
import useRefreshToken from './useRefreshToken'
import useAuth from './useAuth'

const useAxiosPrivate = () => {
  const refresh = useRefreshToken()
  const { auth } = useAuth()

  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers['Authorization']) {
          console.log('發送請求前: 缺少驗證標頭')
          config.headers['Authorization'] = `Bearer ${auth.accessToken}`
        }
        return config
      },
      (error) => Promise.reject(error)
    )

    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        let newAccessToken
        const prevRequest = error.config
        if (error.response.status === 401 && !prevRequest.sent) {
          console.log('接收回應前:', error.response.data.message)
          prevRequest.sent = true
          console.log('Old Access Token: ', auth.accessToken)
          newAccessToken = await refresh()
          console.log('New Access Token: ', newAccessToken)
          prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`
          return axiosPrivate(prevRequest)
        }
        if (!newAccessToken) {
          error.sign = 'out'
        }
        return Promise.reject(error)
      }
    )

    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept)
      axiosPrivate.interceptors.response.eject(responseIntercept)
    }
  }, [])

  return axiosPrivate
}

export default useAxiosPrivate
