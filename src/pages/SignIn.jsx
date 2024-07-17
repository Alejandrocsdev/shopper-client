// 組件
import Sign from '../components/Sign'
import Step1 from './SignInSteps/Step1'

// Sign: 登入頁(密碼登入 / 簡訊登入)
// Step1: 輸入簡訊驗證碼

// 鉤子函式
import { useState } from 'react'

// 登入流程: 密碼 / 簡訊
function SignIn() {
  const [step, setStep] = useState(0)
  const [phone, setPhone] = useState('')

  // 下一步(包含資料傳遞: phone)
  const next = (method) => {
    setPhone(method.phone)
    setStep((prevStep) => prevStep + 1)
  }

  const method = { phone }

  // 上一步
  const previous = () => setStep((prevStep) => prevStep - 1)

  return (
    <div>
      {step === 0 && <Sign isSignIn={true} isSmsSignIn={false} onNext={next} />}
      {step === 1 && <Sign isSignIn={true} isSmsSignIn={true}  onNext={next} onPrevious={previous} />}
      {step === 2 && <Step1 onPrevious={previous} phone={phone} />}
    </div>
  )
}

export default SignIn
