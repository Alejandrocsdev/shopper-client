// 模組樣式
import S from './style.module.css'
// 鉤子函式
import { useNavigate } from 'react-router-dom'
import useSignOut from '../../hooks/useSignOut'

function Profile() {

  const navigate = useNavigate()

  const signOut = useSignOut()

  const handleSignOut = async () => {
    return await signOut()
  }

  return (
    <>
      <div>會員中心</div>
      <button onClick={handleSignOut}>登出</button>
    </>
  )
}

export default Profile
