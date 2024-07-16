// 模組樣式
import Styles from './style.module.css'
// 組件
import Anchor from '../../components/Elements/Anchor'

// 錯誤頁面
const NotFound = () => {
  return (
    <main className={Styles.main}>
      <section className={Styles.section}>
        <h1 className={Styles.title}>404</h1>
        <p className={Styles.text}>您訪問的頁面不存在</p>
        <Anchor style={Styles.redirect} content="返回首頁" to="/" />
      </section>
    </main>
  )
}

export default NotFound
