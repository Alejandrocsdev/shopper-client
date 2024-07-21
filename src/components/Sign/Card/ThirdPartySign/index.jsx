// 模組樣式
import S from './style.module.css'
// PNG 圖檔
import facebookPng from '../../../../assets/images/thirdParty/facebook.png'
import googlePng from '../../../../assets/images/thirdParty/google.png'
// API
import axios from '../../../../api/axios'
// 鉤子函式
import { useNavigate } from 'react-router-dom'

// 第三方 登入 / 註冊
const ThirdPartySign = () => {
  // 導向
  const navigate = useNavigate()

  const handleFacebook = async (e) => {
    try {
      await axios.get('/auth/signUp/facebook')
      
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className={S.thirdParty}>
      <div className={S.facebookSign} onClick={handleFacebook}>
        <img className={S.thirdPartyLogo} src={facebookPng} />
        <div className={S.thirdPartyText}>Facebook</div>
      </div>
      <div className={S.googleSign}>
        <img className={S.thirdPartyLogo} src={googlePng} />
        <div className={S.thirdPartyText}>Google</div>
      </div>
    </div>
  )
}

export default ThirdPartySign
