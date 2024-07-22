// 模組樣式
import S from './style.module.css'
// PNG 圖檔
import mainLogoPng from '../../../assets/images/logo/cart_text_square_dark.png'
// 鉤子函式
import { useNavigate } from 'react-router-dom'
// 組件
import Form from './Form'
import ThirdPartySign from './ThirdPartySign'
import Anchor from '../../Elements/Anchor'

// 表單容器: 密碼登入 / 簡訊登入 / 註冊
function Card({ onPrevious, onNext, isSignIn, isSmsSignIn }) {
  // 密碼登入
  const isPwdSignIn = isSignIn && !isSmsSignIn

  return (
    <div className={S.card}>
      <div className={S.cardHeader}>{isSignIn ? '登入' : '註冊'}</div>
      {/* 表單 */}
      <Form onNext={onNext} isSignIn={isSignIn} isSmsSignIn={isSmsSignIn} />
      {/* 忘記密碼 || 其他登入 */}
      {isSignIn && (
        <div className={S.otherSign}>
          <div>{isPwdSignIn && <Anchor style={S.forgotPwd} content="忘記密碼" to="/reset" />}</div>
          <div>
            {isPwdSignIn && <Anchor style={S.smsSignIn} content="使用簡訊登入" onClick={onNext} />}
            {isSmsSignIn && <Anchor style={S.smsSignIn} content="使用密碼登入" onClick={onPrevious} />}
          </div>
        </div>
      )}
      {/* 分隔線 */}
      <div className={`${S.breakLine} ${isSignIn ? S.signInLine : ''}`}>
        <div className={S.lineContainer}>
          <div className={S.line}></div>
        </div>
        <div className={S.or}>或</div>
        <div className={S.lineContainer}>
          <div className={S.line}></div>
        </div>
      </div>
      {/* 第三方登入/註冊 */}
      <ThirdPartySign isSignIn={isSignIn} />
      {/* 服務條款 */}
      {!isSignIn && (
        <div className={S.policy}>
          點擊「下一步」或繼續註冊，即表示您已閱讀並同意瞎皮爾購物的
          <Anchor content="服務條款" />與
          <Anchor content="隱私權政策" />
        </div>
      )}
      {/* 結尾文字 */}
      <div className={S.cardFooter}>
        <span className={S.redirectText}>已經有帳號了嗎&#65311;</span>
        <Anchor
          style={S.redirect}
          to={isSignIn ? '/signUp' : '/signIn'}
          content={isSignIn ? '註冊' : '登入'}
        />
      </div>
    </div>
  )
}

export default Card
