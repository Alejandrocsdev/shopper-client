// 全域樣式
import './global.css'
// 鉤子函式
import { BrowserRouter, Routes, Route } from 'react-router-dom'
// 樣式組件
import Layout from './components/Layout'
// 頁面
import Home from './pages/Home'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'

import SignUpStep1 from './pages/SignUpSteps/Step1'
import SignUpStep2 from './pages/SignUpSteps/Step2'
import SignUpStep3 from './pages/SignUpSteps/Step3'
import SignUpStep4 from './pages/SignUpSteps/Step4'

import SignInStep1 from './pages/SignInSteps/Step1'

import ResetStep1 from './pages/ResetSteps/Step1'
import ResetStep2 from './pages/ResetSteps/Step2'
import ResetStep3 from './pages/ResetSteps/Step3'
import ResetStep4 from './pages/ResetSteps/Step4'
import ResetStep5 from './pages/ResetSteps/Step5'

import NotFound from './pages/NotFound'

function App() {
  return (
    <>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/signIn" element={<SignIn />} />

          <Route path="/signUp-step1-otp" element={<SignUpStep1 />} />
          <Route path="/signUp-step2-password" element={<SignUpStep2 />} />
          <Route path="/signUp-step3-success" element={<SignUpStep3 />} />
          <Route path="/signUp-step4" element={<SignUpStep4 />} />

          <Route path="/signIn-step1-otp" element={<SignInStep1 />} />

          <Route path="/reset-step1" element={<ResetStep1 />} />
          <Route path="/reset-step2" element={<ResetStep2 />} />
          <Route path="/reset-step3-password" element={<ResetStep3 />} />
          <Route path="/reset-step4-success" element={<ResetStep4 />} />
          <Route path="/reset-step5" element={<ResetStep5 />} />

          <Route path="/" element={<Layout />}>
            {/* 公開路由 */}
            <Route index element={<Home />} />
          </Route>

          {/* 錯誤路由 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
