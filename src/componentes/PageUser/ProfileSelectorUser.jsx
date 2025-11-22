import { useEffect } from 'react';
import ProfileCard from '../PageUser/ProfileCardUser';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const ProfileSelectorUser = () => {

    const { user, refreshUser } = useAuth();
    const navigate = useNavigate();

    // Actualizar usuario al entrar
    useEffect(() => {
        if (user?.id) {
            refreshUser(user.id);
        }
    }, []);

    const perfilesUsuario = user?.perfiles || [];

    // 🟢 FUNCIÓN PARA VALIDAR Y AGREGAR PERFIL
    const handleAddProfile = () => {
        if (perfilesUsuario.length >= 5) {
            toast.error("Puede agregar hasta 5 perfiles.");
            return;
        }

        navigate('/createperfiluser');
    };

    return (
        <div className='min h-screen flex flex-col items-center justify-center bg-black/90 text-white'>
            <h1 className='text-4xl font-bold mb-6'>¿Quién está viendo?</h1>

            <div className='flex flex-wrap justify-center gap-8 mx-10'>
                
                {perfilesUsuario.map((profile) => (
                    <ProfileCard
                        key={profile.id}
                        name={profile.name}
                        avatar={profile.avatar}
                        onClick={() => navigate(`/profileselector/profiles/${profile.id}`)}
                    />
                ))}

                {/* Botón agregar perfil */}
                <div className='flex flex-col items-center cursor-pointer'>
                    <div
                        onClick={handleAddProfile}   // ← aquí va la validación
                        className='w-24 h-24 flex items-center justify-center bg-gray-700 rounded-lg shadow-md hover:bg-gray-600 transition-colors'
                    >
                        <span className='text-4xl font-bold'>+</span>
                    </div>
                    <p className='mt-2 text-sm font-semibold'>Agregar Perfil</p>
                </div>
            </div>

            <button className='mt-8 px-6 py-2 font-semibold bg-gray-800 hover:bg-gray-700 rounded-lg'>
                Administrar Perfiles
            </button>

            <button
                onClick={() => navigate(`/`)}
                className='mt-8 px-6 py-2 font-semibold bg-gray-800 text-white hover:bg-gray-700 rounded-lg'
            >
                Home
            </button>
        </div>
    );
};

export default ProfileSelectorUser;
