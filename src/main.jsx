import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext.jsx'
import { ToastContainer } from "react-toastify"
import { ProfileProvider } from './contexts/ProfileContext.jsx'

createRoot(document.getElementById('root')).render(

    <AuthProvider>
       <ProfileProvider> 
      <BrowserRouter>
        <App />
        <ToastContainer />
      </BrowserRouter>
      </ProfileProvider> 
    </AuthProvider>

)
