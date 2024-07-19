// 模組樣式
import S from './style.module.css'
// Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons'
// 鉤子函式
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useAuth from '../../../../hooks/useAuth'
// API
import axios from '../../../../api/axios'
// URL
const VERIFY_OTP_URL = '/verify/otp'
const GET_USER_URL = '/users/phone'
const SEND_OTP_URL = '/verify/send/otp'
const SMS_SIGN_IN_URL = '/auth/signIn/sms'

// 簡訊驗證碼表單
function OtpCard({ onNext, phone, isSignUp, isSmsSignIn }) {
  // 身分憑證
  const { setAuth } = useAuth()

  // 導向
  const navigate = useNavigate()
  // 輸入欄(格)元素
  const inputRefs = useRef([])
  // OTP 值
  const [otp, setOtp] = useState(new Array(6).fill(''))
  const [otpFilled, setOtpFilled] = useState(false)
  // 錯誤訊息
  const [error, setError] = useState({ errMsg: '', hasError: false })

  // 倒數計時秒數
  const [count, setCount] = useState(60)
  // 是否正在倒數計時的狀態
  const [counting, setCounting] = useState(true)
  // 是否顯示倒數計時的狀態
  const [showCountDown, setShowCountDown] = useState(true)

  // 驗證碼長度
  const length = 6

  // 聚焦於第一個輸入欄
  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus()
    }
  }, [])

  // Change 監聽器
  const handleChange = (index, e) => {
    const { value } = e.target
    if (isNaN(value)) return

    const newOtp = [...otp]
    newOtp[index] = value.substring(value.length - 1)
    setOtp(newOtp)

    // 檢查 OTP 是否填滿
    setOtpFilled(newOtp.every((value) => value !== ''))

    // 如果當前輸入框已填滿，聚焦下一個輸入框
    if (value && index < length - 1 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus()
    }
  }

  // Click 監聽器
  const handleClick = (index) => {
    inputRefs.current[index].setSelectionRange(1, 1)

    if (index > 0 && !otp[index - 1]) {
      inputRefs.current[otp.indexOf('')].focus()
    }
  }

  // Key Down 監聽器
  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0 && inputRefs.current[index - 1]) {
      // 按下退格鍵時聚焦前一個輸入框
      inputRefs.current[index - 1].focus()
    }
  }

  // 處理倒數計時
  useEffect(() => {
    let timer
    if (counting) {
      timer = setInterval(() => {
        setCount((prevCount) => {
          if (prevCount === 1) {
            clearInterval(timer)
            setCounting(false)
            setShowCountDown(false)
          }
          return prevCount - 1
        })
      }, 1000)
    }
    return () => clearInterval(timer)
  }, [counting])

  // 提交按鈕樣式
  const submitStyle = otpFilled ? S.allowed : S.notAllowed

  // 處理提交事件
  const handleSubmit = async () => {
    if (otpFilled) {
      try {
        setError({ errMsg: '', hasError: false })

        // 密碼登入
        if (isSignUp) {
          await axios.post(VERIFY_OTP_URL, { phone, otp: otp.join('') })
          console.log('OTP驗證成功')

          const response = await axios.get(`${GET_USER_URL}/${phone}`)
          const user = response.data.result

          if (user) {
            const { id, username, avatar } = user
            console.log(`電話 ${phone} 已被註冊`)
            onNext({ id, username, avatar, phone }, true)
          } else {
            console.log(`電話 ${phone} 尚未被註冊`)
            onNext({ phone })
          }
        }
        // 簡訊登入
        else if (isSmsSignIn) {
          const response = await axios.post(
            SMS_SIGN_IN_URL,
            { phone, otp: otp.join('') },
            { withCredentials: true }
          )
          setAuth(response.data.result)
          console.log('簡訊登入')
          navigate('/')
        }
        // 重設密碼
        else {
          await axios.post(VERIFY_OTP_URL, { phone, otp: otp.join('') })
          console.log('OTP驗證成功')
          onNext({ phone })
        }
      } catch (err) {
        setError({ errMsg: err.response?.data?.message, hasError: true })
      }
    }
  }

  // 處理重新傳送OTP
  const handleResendOTP = async () => {
    try {
      await axios.post(SEND_OTP_URL, { phone })
      setError({ errMsg: '', hasError: false })
    } catch (err) {
      setError({ errMsg: err.response?.data?.message, hasError: true })
    }
  }

  // 處理倒數計時並傳送OTP
  const handleResend = () => {
    setCount(60)
    setCounting(true)
    setShowCountDown(true)
    handleResendOTP()
  }

  // 元素變數 (倒數計時 || 重新發送)
  const countDownText = <div className={S.countDown}>{`${count}秒後重新傳送`}</div>
  const other = (
    <div>
      沒有收到驗證碼嗎？<span onClick={handleResend}>重新傳送</span>
    </div>
  )

  return (
    <>
      {/* 錯誤訊息 */}
      {error.hasError && (
        <div className={S.errMsg}>
          <div className={S.crossIcon}>
            <FontAwesomeIcon icon={faCircleXmark} />
          </div>
          <div className={S.message}>{error.errMsg}</div>
        </div>
      )}

      {/* 表單文字 */}
      <div className={S.cardText}>
        <div className={S.text}>您的驗證碼已透過簡訊傳送至</div>
        <div className={S.phone}>{phone}</div>
      </div>

      {/* OTP輸入框 */}
      <div className={S.otpContainer}>
        <form className={S.otpForm}>
          <div className={S.inputFields}>
            {otp.map((value, index) => {
              return (
                <input
                  key={index}
                  type="text"
                  ref={(input) => (inputRefs.current[index] = input)}
                  value={value}
                  onChange={(e) => handleChange(index, e)}
                  onClick={() => handleClick(index)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className={S.otpInput}
                />
              )
            })}
          </div>
        </form>
      </div>

      {/* OTP發送倒數 & 其他選項 */}
      <div className={S.other}>
        <div>{showCountDown ? countDownText : other}</div>
      </div>

      {/* 執行下一步 */}
      <div className={`${S.submit} ${submitStyle}`} onClick={handleSubmit}>
        下一步
      </div>
    </>
  )
}

export default OtpCard
