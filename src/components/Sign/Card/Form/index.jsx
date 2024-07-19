// 模組樣式
import S from './style.module.css'
// Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck, faCircleXmark } from '@fortawesome/free-regular-svg-icons'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
// 鉤子函式
import { useState, useRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import useAuth from '../../../../hooks/useAuth'
// API
import axios from '../../../../api/axios'
// URL
const SEND_OTP_URL = '/verify/send/otp'
const PWD_SIGN_IN_URL = '/auth/signIn/pwd'

// 表單: 密碼登入 / 簡訊登入 / 註冊
const Form = ({ onNext, isSignIn, isSmsSignIn }) => {
  // 身分憑證
  const { setAuth } = useAuth()

  // 密碼登入
  const isPwdSignIn = isSignIn && !isSmsSignIn
  // 導向
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/'

  // loginKey / password
  const [input, setInput] = useState({ loginKey: '', password: '' })
  // 顯示密碼
  const [showPwd, setShowPwd] = useState(false)
  // 是否輸入過
  const [hasTyped, setHasTyped] = useState({ loginKey: false, password: false })
  // 錯誤訊息
  const [error, setError] = useState({ errMsg: '', hasError: false })

  // 手機號碼格式
  const phoneCheck = input.loginKey.startsWith('09') && input.loginKey.length === 10

  // change 監聽器
  const handleChange = (e) => {
    const { id, value } = e.target
    setInput((prev) => ({ ...prev, [id]: value }))
    if (!hasTyped[id] && value !== '') {
      setHasTyped((prev) => ({ ...prev, [id]: true }))
    }
  }

  // 顯示錯誤
  const showWarning = (type) => {
    if (isPwdSignIn) {
      return hasTyped[type] && input[type] === ''
    } else if (type === 'loginKey') {
      return hasTyped.loginKey && !phoneCheck
    }
  }

  // 切換密碼顯示
  const togglePassword = () => setShowPwd(!showPwd)

  // 提交狀態
  const isSubmitDisabled = () => {
    if (isPwdSignIn) {
      return input.loginKey === '' || input.password === ''
    } else {
      return !phoneCheck
    }
  }

  // 提交按鈕樣式
  const submitStyle = isSubmitDisabled() ? S.notAllowed : S.allowed

  // 提交函式
  const handleSubmit = async () => {
    // 無法提交
    if (isSubmitDisabled()) return

    try {
      // 密碼登入
      if (isPwdSignIn) {
        const response = await axios.post(PWD_SIGN_IN_URL, input, { withCredentials: true })
        setError({ errMsg: '', hasError: false })
        setAuth(response.data.result)
        // 導向首頁
        navigate(from, { replace: true })
        console.log('密碼登入')
      }
      // 發送簡訊驗證碼(註冊 / 簡訊登入)
      else {
        await axios.post(SEND_OTP_URL, { phone: input.loginKey })
        // 導向下一頁
        onNext({ phone: input.loginKey })
        console.log('簡訊發送')
      }
    } catch (err) {
      setError({ errMsg: err.response?.data?.message, hasError: true })
    }
  }

  return (
    <div>
      {/* 提交錯誤訊息 */}
      {error.hasError && (
        <div className={S.errMsg}>
          <div className={S.crossIcon}>
            <FontAwesomeIcon icon={faCircleXmark} />
          </div>
          <div className={S.message}>{error.errMsg}</div>
        </div>
      )}

      {/* loginKey || phone */}
      <div className={S.inputContainer}>
        <input
          className={`${S.input} ${showWarning('loginKey') ? S.inputWarning : ''}`}
          id="loginKey"
          type="text"
          name={isPwdSignIn ? 'loginKey' : 'phone'}
          placeholder={isPwdSignIn ? '電話號碼/使用者名稱/Email' : '手機號碼'}
          value={input.loginKey}
          onChange={handleChange}
        />

        {/* 手機輸入成功 */}
        {!isPwdSignIn && phoneCheck && (
          <div className={S.checkContainer}>
            <FontAwesomeIcon className={S.check} icon={faCircleCheck} />
          </div>
        )}
      </div>

      {/* 輸入欄錯誤訊息 */}
      <div className={S.textWarning}>
        {showWarning('loginKey') ? (isPwdSignIn ? '請填寫此欄位' : '請輸入有效行動電話號碼') : ''}
      </div>

      {/* password */}
      {isPwdSignIn && (
        <>
          <div className={S.inputContainer}>
            <input
              className={`${S.input} ${showWarning('password') ? S.inputWarning : ''}`}
              id="password"
              type={showPwd ? 'text' : 'password'}
              name="password"
              placeholder="密碼"
              value={input.password}
              onChange={handleChange}
              maxLength={16}
            />

            {/* 顯示密碼按鈕 */}
            <div className={S.eyeContainer} onClick={togglePassword}>
              <FontAwesomeIcon className={S.eye} icon={showPwd ? faEye : faEyeSlash} />
            </div>
          </div>

          {/* 輸入欄錯誤訊息 */}
          <div className={S.textWarning}>{showWarning('password') ? '請填寫此欄位' : ''}</div>
        </>
      )}

      {/* 提交按鈕 */}
      <button className={`${S.submit} ${submitStyle}`} onClick={handleSubmit}>
        {isSignIn ? '登入' : '下一步'}
      </button>
    </div>
  )
}

export default Form
