// 組件
import Sign from '../components/Sign'
import Step1 from './SignUpSteps/Step1'
import Step2 from './SignUpSteps/Step2'
import Step3 from './SignUpSteps/Step3'
import Step4 from './SignUpSteps/Step4'

// Sign: 註冊頁(輸入手機號碼)
// Step1: 輸入簡訊驗證碼
// Step2: 輸入註冊密碼
// Step3: 註冊成功
// Step4: 已註冊過
// Step5: 臉書註冊失敗

// 鉤子函式
import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// 註冊流程
function SignUp() {
  // 步驟
  const [step, setStep] = useState(0)
  // 用戶資料
  const [id, setId] = useState('')
  const [username, setUsername] = useState('')
  const [phone, setPhone] = useState('')
  const [avatar, setAvatar] = useState('')
  const [email, setEmail] = useState('')
  const [facebookId, setFacebookId] = useState('')
  // 用戶資料物件
  const user = { id, username, phone, avatar, email, facebookId }

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search)

    if (queryParams.get('facebook') === 'true') {
      setStep(2)
      setAvatar(queryParams.get('avatar'))
      setEmail(queryParams.get('email'))
      setFacebookId(queryParams.get('facebookId'))
    } else if (queryParams.get('facebook') === 'false') {
      setStep(5)
    } 
  }, [location.search])

  // 下一步(包含資料傳遞)
  const next = (user, isSignedUp = false) => {
    // 設定用戶資料
    setId(user.id)
    setUsername(user.username)
    setPhone(user.phone)
    setAvatar(user.avatar)
    setEmail(user.email)
    setFacebookId(user.facebookId)
    // 設定步驟
    setStep((prevStep) => {
      switch (prevStep) {
        // 如已註冊過 => 已註冊畫面(步驟4)
        case 1:
          return isSignedUp ? 4 : 2
        // 如已註冊過且不登入 => 返回註冊頁
        case 4:
          return 0
        // 導向下一步
        default:
          return prevStep + 1
      }
    })
  }

  // 上一步
  const previous = () => setStep((prevStep) => prevStep - 1)

  return (
    <div>
      {step === 0 && <Sign onNext={next} isSignIn={false} isSmsSignIn={false} />}
      {step === 1 && <Step1 onNext={next} onPrevious={previous} phone={phone} />}
      {step === 2 && <Step2 onNext={next} phone={phone} />}
      {step === 3 && <Step3 id={id} phone={phone} />}
      {step === 4 && <Step4 onNext={next} id={id} phone={phone} username={username} avatar={avatar} />}
    </div>
  )
}

export default SignUp
