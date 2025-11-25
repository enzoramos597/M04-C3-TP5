import { Route, Routes, Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
{/*Layout*/}
import Layout from '../componentes/Layout'    
import LayoutUser from '../componentes/LayoutUser'  
import LayoutAdmin from '../componentes/LayoutAdmin'

import Main from '../componentes/Main'
import IniciarSesion from '../componentes/IniciarSesion'
import RegisterFormUser from '../componentes/PageUser/RegisterFormUser'
import RegisterFormAdmin from '../componentes/PagesAdmin/RegisterFormAdmin'

import ProfileSelectorUser from '../componentes/PageUser/ProfileSelectorUser'
import CreateProfileUser from '../componentes/PageUser/CreateProfileUser'

import UploadMovie from '../componentes/PagesAdmin/UploadMovie'


import CreateProfile from '../componentes/CreateProfile'
import ProfileSelector2 from '../componentes/ProfileSelector2'

import portada from '../assets/Inicio_portada.webp'
import DashboardAdmin from '../componentes/PagesAdmin/DashboardAdmin'
import ListaPelicula from '../componentes/PagesMovies/ListaPelicula'
import MovieDetail from '../componentes/PagesMovies/MovieDetail'
import UpdateMovie from '../componentes/PagesAdmin/UpdateMovie'
import ProfileSelectorAdmin from '../componentes/PagesAdmin/ProfileSelectorAdmin'
import ManageProfilesUser from '../componentes/PageUser/ManageProfilesUser'
import EditProfileUser from '../componentes/PageUser/EditProfileUser'
import DetailPerfilAdmin from '../componentes/PagesAdmin/DetailPerfilAdmin'
import CuentaDeshabilitada from '../componentes/PageUser/CuentaDeshabilitada'
import ValidateIdRoute from './ValidateIdRoute'


const AppRouter = () => {

  const { user } = useAuth()
  const isAdmin = user?.type === "Administrador"
  const isUser = user?.type === "usuario"

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
             <Route path='peliculas' element={<ListaPelicula />} />
            <Route path="registrar-usuario" element={<RegisterFormUser />} />
            <Route path="register-admin" element={<RegisterFormAdmin />} />
             <Route path="cuenta-deshabilitada" element={<CuentaDeshabilitada />} />
           {/* <Route path="uploadmovie" element={<Navigate to="/iniciar-sesion" />} />*/}
          </Route>
        )}

        {/* 🔵 RUTAS USUARIO */}
        {isUser && (
          <Route path="/" element={<LayoutUser />}>     
            <Route index element={<ProfileSelectorUser/> }/>
            <Route path='peliculas' element={<ListaPelicula />} />
            <Route path="peliculas/:id" element={<MovieDetail />} />
            <Route path="profileselector/:id" element={<ProfileSelectorUser />} />
            <Route path="createperfiluser" element={<CreateProfileUser />} />
            <Route path="manageprofiles" element={<ManageProfilesUser />} />
            <Route path="/edit-profile/:id" element={<EditProfileUser />} />
           
          </Route>
        )}

        {/* 🔴 RUTAS ADMIN */}
        {isAdmin && (
          <Route path="/" element={<LayoutAdmin />}>
            <Route index element={<DashboardAdmin />} />
            <Route path= "peliculas" element= {<ListaPelicula />} />
            <Route path="peliculas/:id" element={<MovieDetail />} />
            <Route path="uploadmovie" element={<UploadMovie />} />
            <Route path="gestion-usuarios" element={<ProfileSelectorAdmin/>} />
            <Route path='/gestion-usuarios/usuarios/:id' element={<DetailPerfilAdmin/>}/>
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
