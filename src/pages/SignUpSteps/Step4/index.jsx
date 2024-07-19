// 模組樣式
import S from './style.module.css'
// PNG 圖示
import avatarPng from '../../../assets/images/avatar/avatar.png'
// 組件
import Step from '../../../components/Sign/Step'
// 鉤子函式
import { useNavigate } from 'react-router-dom'
import { useError } from '../../../contexts/ErrorContext'
import useAuth from '../../../hooks/useAuth'
// API
import axios from '../../../api/axios'
// URL
const AUTO_SIGN_IN_URL = '/auth/signIn/auto'

// 註冊(4): 已註冊過
function Step4({ onNext, id, username, phone, avatar }) {
  // 身分憑證
  const { setAuth } = useAuth()

  // 全域錯誤訊息
  const { setErrMsg } = useError()
  const handleError = (message) => setErrMsg(message)

  // 導向
  const navigate = useNavigate()

  // 處理表單提交事件
  const handleLogin = async () => {
    try {
      const response = await axios.post(`${AUTO_SIGN_IN_URL}/${id}`, null, {
        withCredentials: true
      })
      setAuth(response.data.result)
      console.log('自動登入')
      navigate('/')
    } catch (err) {
      handleError('自動登入失敗')
    }
  }

  const main = (
    <>
      <div className={S.avatarContainer}>
        <img className={S.avatar} src={avatar || avatarPng} />
      </div>
      <div className={S.username}>{username}</div>
      <div className={S.phone}>{phone}</div>
      <div className={S.text}>
        此手機號碼已被此帳號使用，若此帳號屬於您，請點選「是，前往登入」。
      </div>
      {/* 登入 */}
      <div className={S.submit} onClick={handleLogin}>
        是，前往登入
      </div>
      {/* 返回註冊 */}
      <div className={S.back} onClick={onNext}>
        否，返回註冊頁面
      </div>
    </>
  )

  return <Step pageName="登入" cardName="這是您的帳號嗎?" main={main} />
}

export default Step4
