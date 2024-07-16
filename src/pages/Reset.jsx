// 組件
// import Step1 from '../pages/ResetSteps/Step1'
// import Step2 from '../pages/ResetSteps/Step2'
// import Step3 from '../pages/ResetSteps/Step3'
// import Step4 from '../pages/ResetSteps/Step4'
// import Step5 from '../pages/ResetSteps/Step5'

// Step1: 輸入 信箱 / 手機
// Step2: 驗證信發送成功(信箱) / 輸入重設密碼(手機)
// Step3: 輸入重設密碼(信箱) / 密碼重設成功(手機)
// Step4: 密碼重設成功(信箱)
// Step5: 密碼重設失敗(信箱)

// Hooks
import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// 重設密碼
function Reset() {
  // 路徑
  const location = useLocation()
  // 步驟
  const [step, setStep] = useState(1)
  // 用戶資料
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  // 驗證信 query
  const [message, setMessage] = useState('')

  const method = { phone, email }

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search)

    if (queryParams.get('verified') === 'true') {
      setStep(3)
      setEmail(queryParams.get('result'))
    } else if (queryParams.get('verified') === 'false') {
      setStep(5)
      setMessage(queryParams.get('message'))
    }
  }, [location.search])

  // 下一步(包含資料傳遞)
  const next = (method) => {
    setPhone(method?.phone)
    setEmail(method?.email)
    setStep((prevStep) => (prevStep === 5 ? 1 : prevStep + 1))
  }

  // 上一步
  const previous = () => setStep((prevStep) => prevStep - 1)

  return (
    <div>
      {/* {step === 1 && <Step1 onNext={next} />}
      {step === 2 && <Step2 onPrevious={previous} onNext={next} phone={phone} email={email} />}
      {step === 3 && <Step3 onNext={next} phone={phone} email={email} />}
      {step === 4 && <Step4 phone={phone} email={email} />}
      {step === 5 && <Step5 onNext={next} message={message} />} */}
    </div>
  )
}

export default Reset
