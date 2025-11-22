import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useAuth } from "../../contexts/AuthContext";

// Avatares
import doug from "../../assets/avatars/doug.jpg";
import starwars from "../../assets/avatars/starwars.jpeg";
import starwars2 from "../../assets/avatars/starwars2.webp";
import starwars3 from "../../assets/avatars/starwars3.webp";

const avatars = [doug, starwars, starwars2, starwars3];

const API = "https://69153a6384e8bd126af9262c.mockapi.io/users";

const CreateProfileUser = () => {
  const { user } = useAuth();   
  const userId = user.id;        // ID REAL DEL LOGUEADO

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [errorLimite, setErrorLimite] = useState("");

  const onSubmit = async (data) => {
    try {
      const { data: userData } = await axios.get(`${API}/${userId}`);

      const perfiles = userData.perfiles || [];

      if (perfiles.length >= 5) {
        return setErrorLimite("Puedes crear hasta 5 perfiles");
      }

      const nextId = perfiles.length + 1;

      const nuevoPerfil = {
        id: nextId,
        name: data.name,
        avatar: data.avatar,
      };

      await axios.put(`${API}/${userId}`, {
        ...userData,
        perfiles: [...perfiles, nuevoPerfil],
      });

      navigate(`/profiles/${nextId}`);

    } catch (error) {
      console.log(error);
      setErrorLimite("Error al crear el perfil");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-6">
      <div className="bg-gray-800 p-6 rounded-xl shadow-xl w-full max-w-sm text-center">

        <h2 className="text-xl text-white font-bold mb-4">Crear Perfil</h2>

        {errorLimite && (
          <p className="text-red-500 font-semibold mb-2">{errorLimite}</p>
        )}

        {/* FORMULARIO */}
        <form onSubmit={handleSubmit(onSubmit)}>
          
          {/* Nombre */}
          <input
            type="text"
            placeholder="Nombre del perfil"
            className="w-full p-2 mb-3 bg-gray-700 text-white rounded"
            {...register("name", { required: "El nombre es obligatorio" })}
          />

          {errors.name && (
            <p className="text-red-400 text-sm">{errors.name.message}</p>
          )}

          {/* Avatares */}
          <p className="text-white mb-2 font-semibold">Selecciona un avatar:</p>

          <div className="grid grid-cols-4 gap-3 justify-center mb-4">
            {avatars.map((avatar, index) => (
              <img
                key={index}
                src={avatar}
                alt="avatar"
                onClick={() => {
                  setSelectedAvatar(avatar);
                  setValue("avatar", avatar, { shouldValidate: true });
                }}
                className={`w-16 h-16 rounded-full object-cover cursor-pointer border-4 transition 
                ${selectedAvatar === avatar ? "border-red-500 scale-105" : "border-transparent"}
                `}
              />
            ))}
          </div>

          {/* Campo invisible para avatar */}
          <input
            type="hidden"
            {...register("avatar", { required: "Debe seleccionar un avatar" })}
          />

          {errors.avatar && (
            <p className="text-red-400 text-sm mb-2">{errors.avatar.message}</p>
          )}

          {/* Botón */}
          <button
            type="submit"
            className="mt-2 bg-red-600 text-white px-4 py-2 rounded w-full hover:bg-red-700 transition"
          >
            Crear Perfil
          </button>

        </form>
      </div>
    </div>
  );
};

export default CreateProfileUser;
