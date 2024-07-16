// 模組樣式
import S from './style.module.css'
// Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons'
// 組件
import Step from '../../../components/Sign/Step'
// 鉤子函式
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

// 重設密碼(5): 密碼設定失敗畫面
function Step5({ onNext, message }) {
  // 導向
  const navigate = useNavigate()
  // 倒數計時秒數
  const [count, setCount] = useState(10)

  // 成功圖示
  const failureIcon = <FontAwesomeIcon icon={faCircleXmark} />

  useEffect(() => {
    // 處理倒數計時
    const countdown = setInterval(() => {
      setCount((prevCount) => prevCount - 1)
    }, 1000)

    if (count === 0) {
      clearInterval(countdown)
      onNext()
    }

    return () => clearInterval(countdown)
  }, [count, navigate])

  const main = (
    <>
      <div className={S.failureIcon}>{failureIcon}</div>
      <div className={S.cardText}>
        <div className={S.errMsg}>{message}</div>
        <div className={S.text}>
          您將在 <span className={S.count}>{count}</span> 秒內回到登入頁面
        </div>
      </div>
      <div className={S.submit} onClick={onNext}>
        回到登入頁面
      </div>
    </>
  )

  return <Step pageName="重設" cardName="重設密碼失敗" main={main} />
}

export default Step5
