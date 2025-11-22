import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Layout from '../componentes/Layout'
import Main from '../componentes/Main'
import IniciarSesion from '../componentes/InciarSesion'
import CreateProfile from '../componentes/CreateProfile'
import RegisterForm from '../componentes/RegisterForm'
import ProfileSelector2 from '../componentes/ProfileSelector2'
import portada from '../assets/Inicio_portada.webp'

const AppRouter = () => {
  return (
    <div
      className="min-h-screen text-neutral-100 bg-black/50"
      style={{
        backgroundImage: `url(${portada})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <Routes>

        {/* Todas las páginas que usan Header + Footer */}
        <Route path='/' element={<Layout />}>

          {/* Página principal */}
          <Route index element={<Main />} />

          {/* Iniciar sesión */}
          <Route path="/iniciar-sesion" element={<IniciarSesion />} />

          {/* Registrar usuario */}
          <Route path="/registrar-usuario" element={<RegisterForm />} />

           

        </Route>

        {/* Rutas que NO usan header/footer */}
        <Route path="/profilesuser/:id" element={<ProfileSelector2 />} />

        <Route path="/profiles/:id/create-profile" element={<CreateProfile />} />

      </Routes>
    </div>
  )
}

export default AppRouter
