

import { useNavigate } from 'react-router-dom'
import IniciarSesion from './InciarSesion'

const Home = () => {
    const navigate = useNavigate()
   
    return (
        <>
            <div className='min h-screen flex flex-col items-center justify-center bg-black/90 text-white '>
                <h1 className='text-4xl font-bold mb-6'>Bienvenido a PeliFlix</h1>
                <p className='text-lg'>Tu plataforma de streaming favorita</p>
                
                <IniciarSesion />
                 <button
                    onClick={() => navigate(`/profilesadmin`)}
                    className='mt-8 px-6 py-2 font-semibold bg-gray-800 text-white hover:bg-gray-700 rounded-lg'>
                    Ir a Perfiles admin
                </button>

                 <button
                    onClick={() => navigate(``)}
                    className='mt-8 px-6 py-2 font-semibold bg-gray-800 text-white hover:bg-gray-700 rounded-lg'>
                    Ir a Perfiles Usuario
                </button>

                <button
                    onClick={() => navigate(`/registrar-usuario`)}
                    className='mt-8 px-6 py-2 font-semibold bg-gray-800 text-white hover:bg-gray-700 rounded-lg'>
                    Registrar
                </button>
            </div>
        </>
    )
}

export default Home
