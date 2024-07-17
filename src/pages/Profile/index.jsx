// 模組樣式
import S from './style.module.css'
// 鉤子函式
import { useNavigate } from 'react-router-dom'

function Profile() {
  const navigate = useNavigate()

  return (
    <>
      <div>This is Profile</div>
    </>
  )
}

export default Profile
