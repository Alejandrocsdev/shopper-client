import { Outlet } from 'react-router-dom'
import Header from './Header'

// 樣式組件
function Layout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}

export default Layout
