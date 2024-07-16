// 模組樣式
import Styles from './style.module.css'
// 組件
import Step from '../../../components/Sign/Step'
// 鉤子函式
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

// 重設密碼(1): 發送驗證碼 / 發送驗證信
function Step1({ onNext }) {
  // 導向
  const navigate = useNavigate()

  const [loginKey, setLoginKey] = useState('')
  const [hasTyped, setHasTyped] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [isPhone, setIsPhone] = useState(false)
  const [isValid, setIsValid] = useState(false)

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

  // 處理發送OTP事件
  const handleSubmit = async () => {
    if (isValid) {
      try {
        const method = isPhone ? 'phone' : 'email'
        const url = method === 'phone' ? SEND_OTP_URL : SEND_LINK_URL
        axios.post(url, { [method]: loginKey })
        if (method === 'phone') {
          onNext({ phone: loginKey })
        } else {
          onNext({ email: loginKey })
        }
      } catch (err) {
        console.log(err.response?.data?.message)
      }
    }
  }

  const main = (
    <>
      {/* 電話/信箱輸入欄 */}
      <div className={Styles.loginKey}>
        <input
          className={Styles.loginKeyInput}
          type="text"
          name={isPhone ? 'phone' : 'email'}
          placeholder="Email / 手機號碼"
          value={loginKey}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </div>
      {/* 輸入錯誤 */}
      <div className={Styles.warning}>{errorMessage}</div>
      {/* 執行下一步 */}
      <div className={`${Styles.submit} ${isValid ? Styles.allowed : Styles.notAllowed}`}>
        下一步
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
