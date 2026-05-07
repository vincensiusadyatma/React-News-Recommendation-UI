import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter,Routes, Route } from 'react-router'
import './index.css'

import LoginPage from './pages/LoginPage.tsx'
import RegisterPage from './pages/RegisterPage.tsx'
import MainPage from './pages/MainPage.tsx'
import AuthOnly from './guards/AuthOnly.tsx'
import NewsDetailPage from './pages/NewsDetailsPage.tsx'
import AdminMainPage from './pages/admin/AdminMainPage.tsx'
import RecallPage from './pages/admin/RecallPage.tsx'
import PrecisionPage from './pages/admin/PrecisionPage.tsx'
import F1Page from './pages/admin/F1Page.tsx'
import MapPage from './pages/admin/MapPage.tsx'
import ManageNewsPage from './pages/admin/ManageNewsPage.tsx'
import StatMainPage from './pages/admin/StatMainPage.tsx'
import DetailStatPage from './pages/admin/DetailStatPage.tsx'
import AdminOnly from './guards/AdminOnly.tsx'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
          <Route element={<AuthOnly/>}>
              <Route element={<AdminOnly/>}>
                <Route path='/admin/' element={<AdminMainPage />} />
                <Route path='/admin/recall' element={<RecallPage />} />
                <Route path='/admin/precision' element={<PrecisionPage />} />
                <Route path='/admin/f1' element={<F1Page />} />
                <Route path='/admin/map' element={<MapPage />} />
                <Route path='/admin/manage' element={<ManageNewsPage />} />
                <Route path='/admin/stat' element={<StatMainPage />} />
                <Route path='/admin/stat/details/:userId' element={<DetailStatPage />} />
              </Route>

              <Route path='/main' element={<MainPage />} />
              <Route path="/news/:id" element={<NewsDetailPage />} />
          </Route>
        
          <Route path='/auth/login' element={<LoginPage />} />
          <Route path='/auth/register' element={<RegisterPage />} />

      </Routes>
    </BrowserRouter>
  </StrictMode>,
)