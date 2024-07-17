import { Outlet } from 'react-router-dom'
import Header from './Header'
import Error from './Error'
import Footer from './Footer'

// 樣式組件
function Layout() {
  return (
    <>
      <Header />
      <Error />
      <Outlet />
      <Footer />
    </>
  )
}

export default Layout
