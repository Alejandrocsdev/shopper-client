import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import useAuth from './useAuth'
import useAxiosPrivate from './useAxiosPrivate'
import useSignOut from './useSignOut'

const useUserData = () => {
  const { auth, sign } = useAuth()
  const [user, setUser] = useState(null)
  const axiosPrivate = useAxiosPrivate()
  const signOut = useSignOut()
  const location = useLocation()

  useEffect(() => {
    // 取得用戶資料
    const fetchData = async () => {
      if (!sign) return

      try {
        const response = await axiosPrivate.get('/users/me', {
          headers: {
            Authorization: auth?.accessToken ? `Bearer ${auth?.accessToken}` : undefined
          }
        })
        console.log('User Data: ', response?.data?.result)
        // 存儲用戶資料
        setUser(response?.data?.result)
      } catch (err) {
        console.log('取得用戶資料失敗')
        if (!err?.sign) {
          await signOut()
        }
      }
    }

    fetchData()
  }, [location])

  return user
}

export default useUserData
