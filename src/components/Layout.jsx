import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'

// 樣式組件
function Layout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  )
}

export default Layout
