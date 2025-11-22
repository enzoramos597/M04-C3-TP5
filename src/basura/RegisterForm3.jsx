import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useProfiles } from "../contexts/ProfileContext";
import AvatarSelector from "./AvatarSelector";

const RegisterForm = () => {
  const navigate = useNavigate();
  const { createProfile } = useProfiles();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      console.log("Enviando datos:", data);
      await createProfile(data);
      navigate("/profiles");
    } catch (error) {
      console.error("Error creando usuario:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[url('https://assets.nflxext.com/ffe/siteui/vlv3/9b38332c-9a79-45e1-bf47-3f8d329fac43/2875c6a8-3843-49f3-b9b8-c39fce969f1e/AR-es-20230717-popsignuptwoweeks-perspective_alpha_website_large.jpg')] bg-cover bg-center">
      
      <div className="bg-black/90 p-8 rounded-lg w-full max-w-md shadow-lg">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">
          Crear Cuenta
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">

          {/* EMAIL */}
          <input
            type="email"
            {...register("email", {
              required: "El correo es obligatorio",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Correo inválido",
              },
            })}
            placeholder="Correo electrónico"
            className="w-full p-3 rounded bg-gray-700 text-white"
          />
          {errors.email && <p className="text-red-500">{errors.email.message}</p>}

          {/* PASSWORD */}
          <input
            type="password"
            {...register("password", {
              required: "La contraseña es obligatoria",
              minLength: { value: 6, message: "Mínimo 6 caracteres" },
            })}
            placeholder="Contraseña"
            className="w-full p-3 rounded bg-gray-700 text-white"
          />
          {errors.password && <p className="text-red-500">{errors.password.message}</p>}

          {/* NAME */}
          <input
            {...register("name", { required: "El nombre del perfil es obligatorio" })}
            placeholder="Nombre del perfil"
            className="w-full p-3 rounded bg-gray-700 text-white"
          />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
          {/*NAME USUARIO*/}
           <input
            {...register("nameuser", { required: "El Apellido es obligatorio" })}
            placeholder="Apellido"
            className="w-full p-3 rounded bg-gray-700 text-white"
          />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
          {/* LAST NAME USUARIO*/}
           <input
            {...register("lastnameuser", { required: "El Apellido es obligatorio" })}
            placeholder="Apellido"
            className="w-full p-3 rounded bg-gray-700 text-white"
          />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
          {/* AVATAR SELECTOR */}
          <AvatarSelector
            setValue={setValue}
            error={errors.avatar}
          />

          {/* Register invisible field for validation */}
          <input
            type="hidden"
            {...register("avatar", { required: "Debe seleccionar un avatar" })}
          />

          {/* SUBMIT */}
          <button
            type="submit"
            className="bg-red-600 text-white w-full p-3 rounded mt-4 text-lg font-semibold hover:bg-red-700 transition"
          >
            Registrarse
          </button>

          <button
            type="button"
            onClick={() => navigate(-1)}
            className="bg-gray-600 text-white w-full p-3 rounded mt-2 hover:bg-gray-700 transition"
          >
            Cancelar
          </button>

        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
