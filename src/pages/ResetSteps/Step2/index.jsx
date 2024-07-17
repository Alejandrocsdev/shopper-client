// 模組樣式
import S from './style.module.css'
// Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelopeCircleCheck } from '@fortawesome/free-solid-svg-icons'
// 組件
import OtpCard from '../../../components/Sign/Step/OtpCard'
import Step from '../../../components/Sign/Step'
// 鉤子函式
import { useNavigate } from 'react-router-dom'

// 重設密碼(2): 輸入簡訊驗證碼 / 驗證信發送成功畫面
function Step2({ onPrevious, onNext, phone, email }) {
  const navigate = useNavigate()

  const isPhone = phone ? true : false

  const emailIcon = <FontAwesomeIcon className={S.emailIcon} icon={faEnvelopeCircleCheck} />

  const emailSent = (
    <>
      <div className={S.iconContainer}>{emailIcon}</div>
      <div className={S.text}>
        驗證信已發送至<span className={S.email}>{email}</span>
      </div>
      <div className={S.text}>請驗證</div>
      {/* 執行下一步 */}
      <div className={S.submit} onClick={() => navigate('/signIn')}>
        下一步
      </div>
    </>
  )

  return (
    <Step
      pageName="重設"
      back={true}
      backPath={onPrevious}
      cardName="重新設定密碼"
      main={
        isPhone 
          ? (<OtpCard onPrevious={onPrevious} onNext={onNext} phone={phone} />) 
          : (emailSent)
      }
    />
  )
}

export default Step2
