// 組件
import Step from '../../components/Sign/Step'
import PasswordCard from '../../components/Sign/Step/PasswordCard'

// 註冊(2): 設定密碼
function Step2({ onNext, phone, email, avatar, facebookId }) {
  return (
    <Step
      pageName="註冊"
      steps={facebookId ? false : true}
      step={2}
      cardName="設定您的密碼"
      main={
        <PasswordCard
          onNext={onNext}
          phone={phone}
          email={email}
          avatar={avatar}
          facebookId={facebookId}
          isSignUp={true}
        />
      }
    />
  )
}

export default Step2
