// 模組樣式
import S from './style.module.css'
// PNG 圖檔
import headerLogoPng from '../../../assets/images/logo/banner_light.png'
// 組件
import Anchor from '../../Elements/Anchor'

// 頁首: 登入 / 註冊 / 重設
const Header = ({ pageName }) => {
  return (
    <header className={S.header}>
      <Anchor off={true} content={<img className={S.headerLogo} src={headerLogoPng} />} to='/'/>
      <div className={S.pageName}>{pageName}</div>
    </header>
  )
}

export default Header
