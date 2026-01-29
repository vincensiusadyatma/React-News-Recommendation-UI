import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter,Routes, Route } from 'react-router'
import './index.css'

import LoginPage from './pages/LoginPage.tsx'
import RegisterPage from './pages/RegisterPage.tsx'
import GuestOnly from './guards/guestOnly.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<GuestOnly />}>
          <Route path='/auth/login' element={<LoginPage />} />
          <Route path='/auth/register' element={<RegisterPage />} />
        </Route>

        <Route element={<GuestOnly />}>
        
        </Route>
        
        <Route path='/auth/register' element={<RegisterPage/>}/>


      </Routes>
      
 
    </BrowserRouter>
    
  </StrictMode>,
)
