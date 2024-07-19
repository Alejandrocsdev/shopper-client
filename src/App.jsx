// 全域樣式
import './global.css'
// 鉤子函式
import { BrowserRouter, Routes, Route } from 'react-router-dom'
// Provider
import { AuthProvider } from './contexts/AuthContext'
import { ErrorProvider } from './contexts/ErrorContext'
// 樣式組件
import Layout from './components/Layout'
// 頁面
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import Reset from './pages/Reset'
import Home from './pages/Home'
import Profile from './pages/Profile'
import NotFound from './pages/NotFound'

function App() {
  return (
    <>
      <AuthProvider>
        <ErrorProvider>
          <BrowserRouter basename="/">
            <Routes>
              <Route path="/signUp" element={<SignUp />} />
              <Route path="/signIn" element={<SignIn />} />
              <Route path="/reset" element={<Reset />} />

              <Route path="/" element={<Layout />}>
                {/* 公開路由 */}
                <Route index element={<Home />} />
                <Route path="/profile" element={<Profile />} />
              </Route>

              {/* 錯誤路由 */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </ErrorProvider>
      </AuthProvider>
    </>
  )
}

export default App
