import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter,Routes, Route } from 'react-router'
import './index.css'

import LoginPage from './pages/LoginPage.tsx'
import RegisterPage from './pages/RegisterPage.tsx'
import MainPage from './pages/MainPage.tsx'
import AuthOnly from './guards/AuthOnly.tsx'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
          <Route element={<AuthOnly/>}>
              <Route path='/main' element={<MainPage />} />
          </Route>
          <Route path='/auth/login' element={<LoginPage />} />
          <Route path='/auth/register' element={<RegisterPage />} />
          
      

      </Routes>
    </BrowserRouter>
  </StrictMode>,
)