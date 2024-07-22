// 模組樣式
import S from './style.module.css'
// PNG 圖檔
import facebookPng from '../../../../assets/images/thirdParty/facebook.png'
import googlePng from '../../../../assets/images/thirdParty/google.png'
// URL
import backUrl from '../../../../utils/url'

// 第三方 登入 / 註冊
const ThirdPartySign = ({ isSignIn }) => {
  // 臉書註冊
  const handleFacebook = async () => {
    window.location.href = `${backUrl}/auth/${isSignIn ? 'signIn' : 'signUp'}/facebook`
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
