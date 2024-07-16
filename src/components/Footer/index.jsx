// 模組樣式
import Styles from './style.module.css'
// PNG 圖檔
import masterCardPng from '../../assets/images/ecpay/masterCard.png'
import visaPng from '../../assets/images/ecpay/visa.png'
import jcbPng from '../../assets/images/ecpay/jcb.png'
import sevenElevenPng from '../../assets/images/ecpay/sevenEleven.png'
import familyMartPng from '../../assets/images/ecpay/familyMart.png'
import okMartPng from '../../assets/images/ecpay/okMart.png'
// Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquareFacebook, faInstagram, faLine } from '@fortawesome/free-brands-svg-icons'
// 組件
import Anchor from '../Elements/Anchor'

// 頁尾組件
const Footer = () => {
  // 社群 LOGO 元素
  const facebook = <FontAwesomeIcon className={Styles.socialMedia} icon={faSquareFacebook} />
  const instagram = <FontAwesomeIcon className={Styles.socialMedia} icon={faInstagram} />
  const line = <FontAwesomeIcon className={Styles.socialMedia} icon={faLine} />

  return (
    <footer className={Styles.footer}>
      <div className={Styles.platformInfo}>
        {/* 付款選項 */}
        <div>
          <div className={Styles.catName}>付款選項</div>
          <div className={Styles.images}>
            <img className={Styles.image} src={masterCardPng} />
            <img className={Styles.image} src={visaPng} />
            <img className={Styles.image} src={jcbPng} />
          </div>
        </div>
        {/* 物流合作 */}
        <div>
          <div className={Styles.catName}>物流合作</div>
          <div className={Styles.images}>
            <img className={Styles.image} src={sevenElevenPng} />
            <img className={Styles.image} src={familyMartPng} />
            <img className={Styles.image} src={okMartPng} />
          </div>
        </div>
        {/* 關注我們 */}
        <div>
          <div className={Styles.catName}>關注我們</div>
          <div className={Styles.images}>
            <Anchor style={Styles.link} content={facebook} />
            <Anchor style={Styles.link} content={instagram} />
            <Anchor style={Styles.link} content={line} />
          </div>
        </div>
      </div>
      {/* 公司資訊 */}
      <div className={Styles.companyInfo}>
        <div>瞎皮爾電商有限公司</div>
        <div>統一編號&#65306;00000000</div>
        <div>&copy; 2024 Shopper. 版權所有。</div>
      </div>
    </footer>
  )
}

export default Footer
