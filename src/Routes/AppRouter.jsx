import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

import Layout from '../componentes/Layout'      // No logueado
import Layout2 from '../componentes/Layout2'    // Logueado

import Main from '../componentes/Main'
import IniciarSesion from '../componentes/IniciarSesion'
import RegisterForm from '../componentes/RegisterForm'
import CreateProfile from '../componentes/CreateProfile'
import ProfileSelector2 from '../componentes/ProfileSelector2'

import portada from '../assets/Inicio_portada.webp'
import ProfileSelectorUser from '../componentes/PageUser/ProfileSelectorUser'
import CreateProfileUser from '../componentes/PageUser/CreateProfileUser'
import Peliculas from '../componentes/Peliculas'

const AppRouter = () => {
  const { user } = useAuth(); // ← Determinamos si está logueado

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

        {/* 👤 Si NO está logueado → usa Layout */}
        {!user && (
          <Route path="/" element={<Layout />}>
            <Route index element={<Main />} />
            <Route path="iniciar-sesion" element={<IniciarSesion />} />
            <Route path="registrar-usuario" element={<RegisterForm />} />
          </Route>
        )}

        {/* 🔐 Si está logueado → usa Layout2 */}
        {user && (
          <Route path="/" element={<Layout2 />}>
            <Route index element={<Peliculas/>} />
            {/* 👉 Aquí puedes agregar rutas internas del usuario logueado */}
            <Route path='/profileselector' element={<ProfileSelectorUser />} />
            <Route path="/createperfiluser" element={<CreateProfileUser />} />
          </Route>
        )}

        {/* Rutas sin Header/Footer */}
        <Route path="/profilesuser/:id" element={<ProfileSelector2 />} />
        <Route path="/profiles/:id/create-profile" element={<CreateProfile />} />

      </Routes>
    </div>
  );
};

export default AppRouter;
