// 模組樣式
import S from './style.module.css'
// Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons'
// 組件
import Header from '../../../components/Sign/Header'
import Error from '../../Error'
import StepsView from '../../../components/Sign/Step/StepsView'
import Footer from '../../../components/Footer'

// 步驟樣板
function Step({ pageName, steps = false, step, back = false, backPath, cardName, main }) {
  return (
    <>
      <Header pageName={pageName} />
      <Error />
      <main className={S.main}>
        <div className={S.mainContainer}>
          {steps && <StepsView step={step} />}
          <div className={S.card}>
            <div className={S.cardHeader}>
              {back && (
                <a className={S.back} onClick={backPath}>
                  <FontAwesomeIcon icon={faArrowLeftLong} />
                </a>
              )}
              <div className={S.cardName}>{cardName}</div>
            </div>
            <div className={S.cardMain}>{main}</div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

export default Step
