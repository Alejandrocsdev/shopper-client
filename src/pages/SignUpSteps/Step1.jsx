// 組件
import Step from '../../components/Sign/Step'
import OtpCard from '../../components/Sign/Step/OtpCard'

// 註冊(1): 驗證手機OTP
function Step1({ onPrevious, onNext, phone }) {
  return (
    <Step
      pageName="註冊"
      steps={true}
      step={1}
      back={true}
      backPath={onPrevious}
      cardName="輸入驗證碼"
      main={<OtpCard onPrevious={onPrevious} onNext={onNext} phone={phone} isSignUp={true} />}
    />
  )
}

export default Step1
