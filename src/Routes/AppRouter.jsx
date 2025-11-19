import React from 'react'
import Home from '../componentes/Home'
import ProfileSelector from '../componentes/ProfileSelector'
import { Route, Routes } from 'react-router-dom'
import CreateProfile from '../componentes/CreateProfile'
import RegisterForm from '../componentes/RegisterForm'
import ProfileSelector2 from '../componentes/ProfileSelector2'

const AppRouter = () => {
  return (
    <>
        {/* Rutas Dinámicas */}
        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/profiles" element={<ProfileSelector/>} />
            
            <Route path='/profiles/:id' element={<ProfileSelector2/>} />
            <Route path='/registrar-usuario' element={<RegisterForm/>} />
        </Routes>
    </>
  )
}

export default AppRouter
