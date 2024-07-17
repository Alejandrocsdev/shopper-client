// 模組樣式
import S from './style.module.css'

import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useError } from '../../contexts/ErrorContext'

// 全域錯誤訊息
function Error() {
  const { errMsg, setErrMsg  } = useError()
  const location = useLocation()

  // 顯示三秒後移除
  useEffect(() => {
    if (errMsg) {
      const timer = setTimeout(() => {
        setErrMsg('')
      }, 5000)

      return () => clearTimeout(timer)
    }
  }, [errMsg, setErrMsg])

  // 導向其他頁面後後移除
  useEffect(() => {
    setErrMsg('')
  }, [location.pathname, setErrMsg])

  if (!errMsg) {
    return null
  }

  return <div className={S.error}>{errMsg}</div>
}

export default Error
