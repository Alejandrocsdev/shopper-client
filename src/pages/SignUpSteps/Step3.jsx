// 組件
import Step from '../../components/Sign/Step'
import Success from '../../components/Sign/Step/Success'

// 註冊(3): 完成成功畫面
function Step3({ id, phone, facebookId }) {
  return (
    <Step
      pageName="註冊"
      steps={facebookId ? false : true}
      step={3}
      cardName="註冊成功!"
      main={<Success id={id} phone={phone} facebookId={facebookId} isSignUp={true} />}
    />
  )
}

export default Step3
