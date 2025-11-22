import ProfileCard from './ProfileCard';
import { useProfiles } from '../contexts/ProfileContext';
import { useNavigate, useParams } from 'react-router-dom';

const ProfileSelector2 = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { profiles, loading } = useProfiles();

  if (loading) return <div>Cargando perfil...</div>;

  const profile = profiles.find((p) => p.id.toString() === id);

  if (!profile) return <div>Perfil no encontrado</div>;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black/90 text-white">
      <h1 className="text-4xl font-bold mb-6">¿Quién está viendo ahora?</h1>

      {/* CONTENEDOR DE PERFILES */}
      <div className="flex flex-wrap justify-center gap-8 mx-10">

        {/* RECORRER EL ARRAY DE PERFILES DEL USUARIO */}
        {profile.perfiles && profile.perfiles.length > 0 ? (
          profile.perfiles.map((perfil) => (
            <ProfileCard
              key={perfil.id}
              name={perfil.name}
              avatar={perfil.avatar}
              onClick={() => navigate(`/profiles/${perfil.id}`)}
            />
          ))
        ) : (
          <p>No hay perfiles creados</p>
        )}

      </div>

      <button className="mt-8 px-6 py-2 font-semibold bg-gray-800 hover:bg-gray-700 rounded-lg">
        Agregar Perfil
      </button>

      <button
        onClick={() => navigate('/')}
        className="mt-8 px-6 py-2 font-semibold bg-gray-800 text-white hover:bg-gray-700 rounded-lg"
      >
        Home
      </button>
    </div>
  );
};

export default ProfileSelector2;
