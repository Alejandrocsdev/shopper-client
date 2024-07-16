// 模組樣式
import S from './style.module.css'
// Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faArrowRightLong } from '@fortawesome/free-solid-svg-icons'

// 註冊步驟圖示
function StepsView({ step }) {
  const stepState = (currentStep) => {
    return currentStep <= step ? true : false
  }
  return (
    <div className={S.steps}>
      {/* 步驟1 */}
      <div className={S.step}>
        <div className={`${S.circle} ${stepState(1) ? S.bgOn : ''}`}>1</div>
        <div className={`${S.circleText} ${stepState(1) ? S.colorOn : ''}`}>驗證電話號碼</div>
      </div>
      <div className={`${S.arrow} ${stepState(2) ? S.colorOn : ''}`}>
        <FontAwesomeIcon icon={faArrowRightLong} />
      </div>
      {/* 步驟2 */}
      <div className={S.step}>
        <div className={`${S.circle} ${stepState(2) ? S.bgOn : ''}`}>2</div>
        <div className={`${S.circleText} ${stepState(2) ? S.colorOn : ''}`}>設定密碼</div>
      </div>
      <div className={`${S.arrow} ${stepState(3) ? S.colorOn : ''}`}>
        <FontAwesomeIcon icon={faArrowRightLong} />
      </div>
      {/* 步驟3 */}
      <div className={S.step}>
        <div className={`${S.circle} ${stepState(3) ? S.bgOn : ''}`}>
          <FontAwesomeIcon className={S.checkIcon} icon={faCheck} />
        </div>
        <div className={`${S.circleText} ${stepState(3) ? S.colorOn : ''}`}>完成</div>
      </div>
    </div>
  )
}

export default StepsView
