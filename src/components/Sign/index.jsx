// 模組樣式
import S from './style.module.css'
// PNG 圖檔
import mainLogoPng from '../../assets/images/logo/cart_text_square_dark.png'
// 組件
import Header from './Header'
import Error from '../Error'
import Card from './Card'
import Footer from '../Footer'

// 樣板: 密碼登入 / 簡訊登入 / 註冊
function Sign({ onPrevious, onNext, isSignIn, isSmsSignIn }) {
  return (
    <>
      <Header pageName={isSignIn ? '登入' : '註冊'} />
      <Error />
      <main className={S.main}>
        <div className={S.mainContainer}>
          <img className={S.mainLogo} src={mainLogoPng} />
          <Card onPrevious={onPrevious} onNext={onNext} isSignIn={isSignIn} isSmsSignIn={isSmsSignIn} />
        </div>
      </main>
      <Footer />
    </>
  )
}

export default Sign
