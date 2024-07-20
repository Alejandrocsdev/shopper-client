// 模組樣式
import S from './style.module.css'
// 組件
import Anchor from '../../components/Elements/Anchor'

// 錯誤頁面
const NotFound = () => {
  return (
    <main className={S.main}>
      <section className={S.section}>
        <h1 className={S.title}>404</h1>
        <p className={S.text}>您訪問的頁面不存在</p>
        <Anchor style={S.redirect} content="返回首頁" to="/" />
      </section>
    </main>
  )
}

export default NotFound
