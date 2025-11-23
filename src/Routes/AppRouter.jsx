import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

import Layout from '../componentes/Layout';      
import Layout2 from '../componentes/Layout2';    

import Main from '../componentes/Main';
import IniciarSesion from '../componentes/IniciarSesion';
import RegisterForm from '../componentes/RegisterForm';
import RegisterFormAdmin from '../componentes/PagesAdmin/RegisterFormAdmin';

import ProfileSelectorUser from '../componentes/PageUser/ProfileSelectorUser';
import CreateProfileUser from '../componentes/PageUser/CreateProfileUser';

import UploadMovie from '../componentes/PagesAdmin/UploadMovie';
import Peliculas from '../componentes/Peliculas';

import CreateProfile from '../componentes/CreateProfile';
import ProfileSelector2 from '../componentes/ProfileSelector2';

import portada from '../assets/Inicio_portada.webp';
import DashboardAdmin from '../componentes/PagesAdmin/DashboardAdmin';
import ListaPelicula from '../componentes/PagesMovies/ListaPelicula';
import MovieDetail from '../componentes/PagesMovies/MovieDetail';
import UpdateMovie from '../componentes/PagesAdmin/UpdateMovie';
import ProfileSelectorAdmin from '../componentes/PagesAdmin/ProfileSelectorAdmin';

const AppRouter = () => {
  const { user } = useAuth();

  const isAdmin = user?.type === "Administrador";
  const isUser = user?.type === "usuario";

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

        {/* 🟢 RUTAS PÚBLICAS */}
        {!user && (
          <Route path="/" element={<Layout />}>
            <Route index element={<Main />} />
            <Route path="iniciar-sesion" element={<IniciarSesion />} />
            <Route path="registrar-usuario" element={<RegisterForm />} />
            <Route path="register-admin" element={<RegisterFormAdmin />} />
            <Route path="uploadmovie" element={<Navigate to="/iniciar-sesion" />} />
          </Route>
        )}

        {/* 🔵 RUTAS USUARIO */}
        {isUser && (
          <Route path="/" element={<Layout2 />}>            
            <Route index element={<ListaPelicula />} />
            <Route path="peliculas/:id" element={<MovieDetail />} />
            <Route path="/profileselector" element={<ProfileSelectorUser />} />
            <Route path="/createperfiluser" element={<CreateProfileUser />} />
          </Route>
        )}

        {/* 🔴 RUTAS ADMIN */}
        {isAdmin && (
          <Route path="/" element={<Layout2 />}>
            <Route index element={<DashboardAdmin />} />
            <Route path= "peliculas" element= {<ListaPelicula />} />
            <Route path="peliculas/:id" element={<MovieDetail />} />
            <Route path="uploadmovie" element={<UploadMovie />} />
            <Route path="gestion-usuarios" element={<ProfileSelectorAdmin/>} />
            {/*<Route path="dashboard-admin" element= {<DashboardAdmin />} />*/}
            <Route path="register-admin" element={<RegisterFormAdmin />} />
            <Route path="updatemovie/:id" element={<UpdateMovie />} />
            {/* Podés agregar más páginas admin */}
          </Route>
        )}

        {/* 🟡 RUTAS SIN LAYOUT */}
        <Route path="/profilesuser/:id" element={<ProfileSelector2 />} />
        <Route path="/profiles/:id/create-profile" element={<CreateProfile />} />

        {/* ❌ CUALQUIER OTRO CAMINO → HOME */}
        <Route path="*" element={<Navigate to="/" />} />

      </Routes>
    </div>
  );
};

export default AppRouter;
