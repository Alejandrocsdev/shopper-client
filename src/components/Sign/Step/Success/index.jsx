// 模組樣式
import S from './style.module.css'
// Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck } from '@fortawesome/free-regular-svg-icons'
// 鉤子函式
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useError } from '../../../../contexts/ErrorContext'
import useAuth from '../../../../hooks/useAuth'
// 組件
import Loading from '../../../../components/Elements/Laoding'
// API
import axios from '../../../../api/axios'
// URL
const AUTO_SIGN_IN_URL = '/auth/signIn/auto'
const NOTIFY_RESET_URL = '/notify/reset/password'

// 成功頁面: 註冊 / 重設密碼
function Success({ id, phone, email, isSignUp = false }) {
  // 身分憑證
  const { setAuth, setSign } = useAuth()

  // 錯誤訊息(全域)
  const { setErrMsg } = useError()
  const handleError = (message) => setErrMsg(message)

  // 導向
  const navigate = useNavigate()
  // 倒數計時秒數
  const [count, setCount] = useState(10)
  // 載入中
  const [loading, setLoading] = useState(false)

  // 成功圖示
  const successIcon = <FontAwesomeIcon icon={faCircleCheck} />

  // 處理倒數計時
  useEffect(() => {
    const countdown = setInterval(() => {
      setCount((prevCount) => prevCount - 1)
    }, 1000)

    if (count === 0) {
      clearInterval(countdown)
      handleSubmit()
    }

    return () => clearInterval(countdown)
  }, [count, navigate])

  // 處理表單提交事件
  const handleSubmit = async () => {
    try {
      if (isSignUp) {
        const response = await axios.post(`${AUTO_SIGN_IN_URL}/${id}`, null, {
          withCredentials: true
        })
        setAuth({ accessToken: response.data.result })
        setSign(true)
        console.log('自動登入')
        navigate('/profile')
      } else if (email) {
        setLoading(true)
        await axios.post(`${NOTIFY_RESET_URL}/email`, { email })
        setLoading(false)
        console.log('密碼重設成功通知信')
        navigate('/signIn')
      } else {
        setLoading(true)
        await axios.post(`${NOTIFY_RESET_URL}/phone`, { phone })
        setLoading(false)
        console.log('密碼重設成功通知簡訊')
        navigate('/signIn')
      }
    } catch (error) {
      setLoading(false)
      isSignUp ? handleError('自動登入失敗') : handleError('發送信箱通知信失敗')
    }
  }

  return (
    <>
      <div className={S.successIcon}>{successIcon}</div>
      <div className={S.cardText}>
        <div className={S.text}>
          您已成功使用{phone ? '電話號碼' : 'Email'}{' '}
          <span className={S.method}>{phone ? phone : email}</span>
          <div>{isSignUp ? '建立瞎皮爾購物帳號' : '重設密碼'}</div>
        </div>
        <div className={S.text}>
          您將在 <span className={S.count}>{count}</span> 秒內回到
          {isSignUp ? '瞎皮爾購物' : '登入頁面'}
        </div>
      </div>
      <div className={S.submit} onClick={handleSubmit}>
        {loading ? <Loading height="30" /> : isSignUp ? '回到瞎皮爾購物' : '回到登入頁面'}
      </div>
    </>
  )
}

export default Success
