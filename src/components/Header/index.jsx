// 模組樣式
import S from './style.module.css'
// PNG 圖檔
import avatarPng from '../../assets/images/avatar/avatar.png'
import headerLogoPng from '../../assets/images/logo/banner_dark.png'
import headerRoundLogoPng from '../../assets/images/logo/cart_text_round_dark.png'
// Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquareFacebook, faInstagram, faLine } from '@fortawesome/free-brands-svg-icons'
import { faCartShopping, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
// 組件
import Anchor from '../Elements/Anchor'
// 鉤子函式
import useUserData from '../../hooks/useUserData'

// 頁首組件
function Header() {
  // 用戶資料
  const user = useUserData()

  // 社群 LOGO 元素
  const facebook = <FontAwesomeIcon className={S.socialMedia} icon={faSquareFacebook} />
  const instagram = <FontAwesomeIcon className={S.socialMedia} icon={faInstagram} />
  const line = <FontAwesomeIcon className={S.socialMedia} icon={faLine} />
  // 登入樣式
  const signInView = (
    <>
      <img className={S.avatar} src={user?.avatar || avatarPng} />
      <div className={S.username}>{user?.username}</div>
    </>
  )
  // 網站 LOGO 元素
  const logo = (
    <>
      <img className={`${S.headerLogo} ${S.largeLogo}`} src={headerLogoPng} />
      <img className={`${S.headerLogo} ${S.smallLogo}`} src={headerRoundLogoPng} />
    </>
  )

  return (
    <>
      <header className={S.header}>
        {/* 導覽列 */}
        <nav className={S.nav}>
          {/* 導覽列左側 */}
          <div className={S.navLeft}>
            {user && <Anchor style={S.seller} content="賣家中心" to="/signIn" />}
            <Anchor style={S.socialMedia} content={facebook} />
            <Anchor style={S.socialMedia} content={instagram} />
            <Anchor style={S.socialMedia} content={line} />
          </div>
          {/* 導覽列右側 */}
          <div className={S.navRight}>
            {/* 登出樣式 */}
            {!user && (
              <div>
                <Anchor style={S.signUp} to="/signUp" content="註冊" />
                <Anchor style={S.signIn} to="/signIn" content="登入" />
              </div>
            )}
            {/* 登入樣式 */}
            {user && (
              <div>
                <Anchor style={S.profileLink} content={signInView} to="/profile" />
              </div>
            )}
          </div>
        </nav>
        {/* 搜尋列 */}
        <div className={S.headerSearch}>
          {/* Logo: 返回首頁 */}
          <Anchor off={true} style={S.homeLink} content={logo} to="/" />
          {/* 搜尋欄 */}
          <div className={S.searchContainer}>
            <input className={S.searchInput} type="text" placeholder="請輸入搜尋關鍵字" />
            <button className={S.searchButton}>
              <FontAwesomeIcon className={S.searchIcon} icon={faMagnifyingGlass} />
            </button>
          </div>
          {/* 購物車 */}
          <div className={S.cartContainer}>
            <FontAwesomeIcon className={S.cartIcon} icon={faCartShopping} />
          </div>
        </div>
      </header>
    </>
  )
}

export default Header
