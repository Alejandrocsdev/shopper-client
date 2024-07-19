// 模組樣式
import S from './style.module.css'
// 組件
import Step from '../../../components/Sign/Step'
// 鉤子函式
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useError } from '../../../contexts/ErrorContext'
// 組件
import Loading from '../../../components/Elements/Laoding'
// API
import axios from '../../../api/axios'
// URL
const SEND_OTP_URL = '/verify/send/otp'
const SEND_LINK_URL = '/verify/send/link'

// 重設密碼(1): 發送驗證碼 / 發送驗證信
function Step1({ onNext }) {
  // 錯誤訊息(全域)
  const { setErrMsg } = useError()
  const handleError = (message) => setErrMsg(message)

  // 導向
  const navigate = useNavigate()

  // 信箱 / 電話
  const [loginKey, setLoginKey] = useState('')
  // 輸入過
  const [hasTyped, setHasTyped] = useState(false)
  // 錯誤訊息(非全域)
  const [errorMessage, setErrorMessage] = useState('')
  // 使用電話與否
  const [isPhone, setIsPhone] = useState(false)
  // 信箱 / 電話 有效
  const [isValid, setIsValid] = useState(false)
  // 載入中
  const [loading, setLoading] = useState(false)

  // change 監聽器
  const handleChange = (e) => {
    const value = e.target.value
    setLoginKey(value)
    setHasTyped(true)
    validateInput(value)
  }

  // 驗證輸入值
  const validateInput = (value) => {
    const phoneRegex = /^09\d{8}$/
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (/^\d+$/.test(value)) {
      if (phoneRegex.test(value)) {
        setErrorMessage('')
        setIsPhone(true)
        setIsValid(true)
      } else {
        setErrorMessage('請輸入有效行動電話號碼')
        setIsPhone(false)
        setIsValid(false)
      }
    } else {
      if (emailRegex.test(value)) {
        setErrorMessage('')
        setIsPhone(false)
        setIsValid(true)
      } else {
        setErrorMessage('無效的email')
        setIsPhone(false)
        setIsValid(false)
      }
    }
  }

  // blur 監聽器
  const handleBlur = () => {
    if (loginKey === '') {
      setHasTyped(false)
      setErrorMessage('')
      setIsValid(false)
    }
  }

  // 提交按鈕樣式
  const submitStyle = isValid ? S.allowed : S.notAllowed

  // 處理發送OTP事件
  const handleSubmit = async () => {
    if (isValid) {
      try {
        setLoading(true)

        const method = isPhone ? 'phone' : 'email'
        const url = method === 'phone' ? SEND_OTP_URL : SEND_LINK_URL
        await axios.post(url, { [method]: loginKey, isReset: true })

        setLoading(false)

        if (method === 'phone') {
          console.log('簡訊發送')
          onNext({ phone: loginKey })
        } else {
          console.log('驗證信發送')
          onNext({ email: loginKey })
        }
      } catch (err) {
        setLoading(false)
        handleError(err.response?.data?.message)
      }
    }
  }

  const main = (
    <>
      {/* 電話/信箱輸入欄 */}
      <div className={S.loginKey}>
        <input
          className={S.loginKeyInput}
          type="text"
          name={isPhone ? 'phone' : 'email'}
          placeholder="Email / 手機號碼"
          value={loginKey}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </div>
      {/* 輸入錯誤 */}
      <div className={S.warning}>{errorMessage}</div>
      {/* 執行下一步 */}
      <div className={`${S.submit} ${submitStyle}`} onClick={handleSubmit}>
        {loading ? <Loading height="30" /> : '下一步'}
      </div>
    </>
  )

  return (
    <Step
      pageName="重設"
      back={true}
      backPath={() => navigate('/signIn')}
      cardName="重新設定密碼"
      main={main}
    />
  )
}

export default Step1
