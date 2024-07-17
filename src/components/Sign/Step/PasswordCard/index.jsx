// 模組樣式
import S from './style.module.css'
// Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { faCircleXmark, faCircleCheck } from '@fortawesome/free-regular-svg-icons'
// 鉤子函式
import { useState } from 'react'

// 輸入密碼表單
function PasswordCard({ onNext, phone, email, isSignUp }) {
  const [showPassword, setShowPassword] = useState(false)
  const [password, setPassword] = useState('')
  const [hasTyped, setHasTyped] = useState(false)
  // 密碼限制
  const [isLowerCase, setIsLowerCase] = useState(false)
  const [isUpperCase, setIsUpperCase] = useState(false)
  const [isLength, setIsLength] = useState(false)
  const [isNumber, setIsNumber] = useState(false)

  // 切換密碼顯示
  const togglePassword = () => setShowPassword(!showPassword)

  // 儲存密碼值 / 紀錄是否輸入過
  const handleChange = (e) => {
    const value = e.target.value
    setPassword(value)
    if (!hasTyped && value !== '') setHasTyped(true)
    validatePassword(value)
  }

  // 焦點處理
  const handleBlur = () => {
    if (password !== '') setHasTyped(true)
  }

  // 驗證密碼條件
  const validatePassword = (value) => {
    setIsLowerCase(/[a-z]/.test(value))
    setIsUpperCase(/[A-Z]/.test(value))
    setIsLength(value.length >= 8 && value.length <= 16)
    setIsNumber(/\d/.test(value))
  }

  // 正確/錯誤 圖示
  const crossIcon = <FontAwesomeIcon className={S.icon} icon={faCircleXmark} />
  const checkIcon = <FontAwesomeIcon className={S.icon} icon={faCircleCheck} />

  // 密碼有效
  const isPwdValid = isLowerCase && isUpperCase && isLength && isNumber

  // 條件樣式(綠/紅)
  const getCriteriaClass = (isValid) => {
    if (!hasTyped) return ''
    return isValid ? S.valid : S.invalid
  }

  // 處理表單提交事件
  const handleSubmit = async () => {
    if (isPwdValid) {
      try {
        if (isSignUp) {
          const response = await axios.post(SIGN_UP_URL, { phone, password })
          const user = response.data.result
          onNext({ id: user.id, phone })
        } else {
          const path = phone ? `/phone/${phone}` : `/email/${email}`
          const response = await axios.put(`${UPDATE_PASSWORD_URL}/${path}`, { password })
          onNext({ phone, email })
        }
      } catch (err) {
        console.log('註冊失敗 / 重設密碼失敗')
      }
    }
  }

  return (
    <>
      <div className={S.cardText}>
        <div className={S.text}>
          {isSignUp ? '最後一步! 請設定您的密碼以完成登入' : '設定一組新密碼給'}
        </div>
        {!isSignUp && <div className={S.method}>{phone ? phone : email}</div>}
      </div>
      {/* 密碼輸入欄 */}
      <div className={S.passwordContainer}>
        <div className={S.password}>
          <input
            className={`${S.passwordInput} ${hasTyped && !isPwdValid ? S.warning : ''}`}
            type={showPassword ? 'text' : 'password'}
            name="password"
            placeholder="密碼"
            value={password}
            onChange={(e) => handleChange(e)}
            onBlur={() => handleBlur()}
            maxLength={16}
            aria-label="Password"
          />
          {/* 顯示密碼 */}
          <div className={S.eyeContainer} onClick={togglePassword} aria-label="Toggle Password">
            <FontAwesomeIcon className={S.eye} icon={showPassword ? faEye : faEyeSlash} />
          </div>
        </div>
        {/* 密碼條件 */}
        <div className={S.criteria}>
          {/* 小寫 */}
          <div className={`${S.criteriaText} ${getCriteriaClass(isLowerCase)}`}>
            <span>{isLowerCase ? checkIcon : crossIcon}</span>
            <span>包含至少一個小寫字母</span>
          </div>
          {/* 大寫 */}
          <div className={`${S.criteriaText} ${getCriteriaClass(isUpperCase)}`}>
            <span>{isUpperCase ? checkIcon : crossIcon}</span>
            <span>包含至少一個大寫字母</span>
          </div>
          {/* 數字 */}
          <div className={`${S.criteriaText} ${getCriteriaClass(isNumber)}`}>
            <span>{isNumber ? checkIcon : crossIcon}</span>
            <span>包含至少一個數字</span>
          </div>
          {/* 字數 */}
          <div className={`${S.criteriaText} ${getCriteriaClass(isLength)}`}>
            <span>{isLength ? checkIcon : crossIcon}</span>
            <span>密碼長度8-16個字元</span>
          </div>
        </div>
      </div>
      {/* 執行下一步 */}
      <div className={`${S.submit} ${isPwdValid ? S.allowed : S.notAllowed}`}>註冊</div>
    </>
  )
}

export default PasswordCard
