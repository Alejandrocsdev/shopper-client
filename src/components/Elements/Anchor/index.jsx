// 模組樣式
import S from './style.module.css'
// 鉤子函式
import { Link } from 'react-router-dom'

// 不刷新導向連結
function Anchor({ style, off, to, onClick, content }) {
  return (
    <Link className={`${off ? '' : S.anchor} ${style}`} to={to} onClick={onClick}>
      {content}
    </Link>
  )
}

export default Anchor