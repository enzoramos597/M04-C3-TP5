

import ProfileCard2 from '../PageUser/ProfileCardUser'
import { useProfiles } from '../../contexts/ProfileContext'
import { useNavigate } from 'react-router-dom'


const ProfileSelectorAdmin = () => {

    const { profiles } = useProfiles()
    const navigate = useNavigate()

    return (
    <>
        <div className='min-h-screen flex flex-col items-center bg-black/90 text-white pt-20 pb-10'>

            <h1 className='text-4xl font-bold mb-6 '>Mostrar todos los perfiles</h1>
            {/* Contenedor de Cards */}
            <div className='flex flex-wrap justify-center gap-8 mx-10'>
                {profiles.map((profile) => (
                    <ProfileCard2 
                        key={profile.id} 
                        name={profile.name} 
                        avatar={profile.avatar}
                        onClick={() => navigate(`/gestion-usuarios/usuarios/${profile.id}`)}
                    />
                ))}
                {/* Agregar más tarjetas de perfil si es necesario */}
                <div className='flex flex-col items-center cursor-pointer'>
                    <div 
                    onClick={()=>navigate('/register-admin')}
                    className='w-24 h-24 flex items-center justify-center bg-gray-700 rounded-lg shadow-md hover:bg-gray-600 transition-colors'>
                        <span className='text-4xl font-bold'>+</span>
                    </div>
                    <p className='mt-2 text-sm font-semibold'>Agregar Perfil</p>
                </div>
                
            </div>
           
            <button
                    onClick={() => navigate(`/`)}
                    className='mt-8 px-6 py-2 font-semibold bg-red-700 hover:bg-red-500 text-white rounded-lg'>
                    Home
                </button>
        </div>
    </>
  )
}

export default ProfileSelectorAdmin
