import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useProfiles } from "../contexts/ProfileContext";
import AvatarSelector from "./AvatarSelector";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
      const profileData = {
        correo: data.email,
        contrasenia: data.password,
        perfil: data.name,
        name: data.firstname,
        apellido: data.lastname,
        avatar: data.avatar,
      };

      console.log("Enviando datos:", profileData);

      await createProfile(profileData);

      // 🔔 Toastify éxito
      toast.success("Usuario creado correctamente 🎉", {
        position: "top-right",
        autoClose: 2000,
      });

      // 🎉 Swal éxito
      await Swal.fire({
        title: "¡Usuario creado!",
        text: "El perfil se registró exitosamente.",
        icon: "success",
        confirmButtonColor: "#e50914",
      });

      navigate("/profiles");
    } catch (error) {
      console.error("Error creando usuario:", error);

      // ❌ Toastify error
      toast.error("Error al crear el usuario", {
        position: "top-right",
        autoClose: 3000,
      });

      // ❌ Swal error
      Swal.fire({
        title: "Error",
        text: "No se pudo crear el usuario",
        icon: "error",
        confirmButtonColor: "#d33",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center">
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
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}

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
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}

          {/* PROFILE NAME */}
<input
  {...register("name", {
    required: "El nombre del perfil es obligatorio",
    maxLength: {
      value: 30,
      message: "Máximo 30 caracteres",
    },
    pattern: {
      value: /^[A-Za-z0-9]+(?: [A-Za-z0-9]+)*$/,
      message: "Solo letras y números",
    },
  })}
  placeholder="Nombre del perfil"
  className="w-full p-3 rounded bg-gray-700 text-white"
/>
{errors.name && <p className="text-red-500">{errors.name.message}</p>}


{/* USER FIRST NAME */}
<input
  {...register("firstname", {
    required: "El nombre del usuario es obligatorio",
    maxLength: {
      value: 20,
      message: "Máximo 20 caracteres",
    },
    pattern: {
      value: /^[A-Za-zÁÉÍÓÚáéíóúÑñ]+$/,
      message: "Solo letras",
    },
  })}
  placeholder="Nombre del usuario"
  className="w-full p-3 rounded bg-gray-700 text-white"
/>
{errors.firstname && (
  <p className="text-red-500">{errors.firstname.message}</p>
)}


{/* USER LAST NAME */}
<input
  {...register("lastname", {
    required: "El apellido es obligatorio",
    maxLength: {
      value: 20,
      message: "Máximo 20 caracteres",
    },
    pattern: {
      value: /^[A-Za-zÁÉÍÓÚáéíóúÑñ]+$/,
      message: "Solo letras",
    },
  })}
  placeholder="Apellido del usuario"
  className="w-full p-3 rounded bg-gray-700 text-white"
/>
{errors.lastname && (
  <p className="text-red-500">{errors.lastname.message}</p>
)}
          {/* AVATAR SELECTOR */}
          <AvatarSelector setValue={setValue} error={errors.avatar} />

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
