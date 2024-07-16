// 組件
import Step from '../../components/Sign/Step'
import PasswordCard from '../../components/Sign/Step/PasswordCard'

// 重設密碼(3): 設定密碼
function Step3({ onNext, phone, email }) {
  return (
    <Step
      pageName="重設"
      cardName="設定您的密碼"
      main={<PasswordCard onNext={onNext} phone={phone} email={email}  />}
    />
  )
}

export default Step3
