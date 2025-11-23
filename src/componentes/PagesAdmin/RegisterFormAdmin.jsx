import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"
import Swal from "sweetalert2"
import { toast } from "react-toastify"
import axios from "axios"
import { useProfiles } from "../../contexts/ProfileContext"
import { API_USERS } from "../../services/api"

const RegisterFormAdmin = () => {
  const navigate = useNavigate();
  const { createProfile } = useProfiles();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // 🟢 Validar correo existente
  const checkEmailExists = async (email) => {
    try {
      const res = await axios.get(API_USERS);
      const exists = res.data.some((u) => u.correo === email);
      return exists;
    } catch (error) {
      console.error("Error checking email:", error);
      return false;
    }
  };

  const onSubmit = async (data) => {
    try {
      const exists = await checkEmailExists(data.email);

      if (exists) {
        toast.error("Este correo ya está registrado 🛑");
        return;
      }

      const newUser = {
        correo: data.email,
        contrasenia: data.password,
        name: data.firstname,
        apellido: data.lastname,
        perfiles: [],
        type: data.type, // 🆕 TIPO ELEGIDO (Administrador o User)
        estado: 1,       // Activo por defecto
      };

      await createProfile(newUser);

      toast.success("Usuario creado correctamente 🎉");

      await Swal.fire({
        title: "¡Cuenta creada!",
        text: "El usuario fue registrado correctamente.",
        icon: "success",
        confirmButtonColor: "#e50914",
      });

      navigate("/");

    } catch (error) {
      toast.error("Error al crear el usuario");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center">
      <div className="bg-black/90 p-8 rounded-lg w-full max-w-md shadow-lg relative">
        <Link
          to="/"
          className="absolute top-3 right-3 text-gray-400 hover:text-red-700 text-2xl"
          title="Cerrar"
        >
          &times;
        </Link>

        <h2 className="text-3xl font-bold text-white mb-6 text-center">
          Crear Usuario (Admin)
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
            <p className="text-red-500 text-sm -mt-3 mb-2">{errors.email.message}</p>
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
            <p className="text-red-500 text-sm -mt-3 mb-2">{errors.password.message}</p>
          )}

          {/* FIRSTNAME */}
          <input
            {...register("firstname", {
              required: "El nombre es obligatorio",
              maxLength: { value: 20, message: "Máximo 20 caracteres" },
              pattern: {
                value: /^[A-Za-zÁÉÍÓÚÑáéíóúñ]+$/,
                message: "Solo letras",
              },
            })}
            placeholder="Nombre"
            className="w-full p-3 rounded bg-gray-700 text-white"
          />
          {errors.firstname && (
            <p className="text-red-500 text-sm -mt-3 mb-2">{errors.firstname.message}</p>
          )}

          {/* LASTNAME */}
          <input
            {...register("lastname", {
              required: "El apellido es obligatorio",
              maxLength: { value: 20, message: "Máximo 20 caracteres" },
              pattern: {
                value: /^[A-Za-zÁÉÍÓÚÑáéíóúñ]+$/,
                message: "Solo letras",
              },
            })}
            placeholder="Apellido"
            className="w-full p-3 rounded bg-gray-700 text-white"
          />
          {errors.lastname && (
            <p className="text-red-500 text-sm -mt-3 mb-2">{errors.lastname.message}</p>
          )}

          {/* 🆕 SELECT TIPO DE USUARIO */}
          <select
            {...register("type", {
              required: "El tipo de usuario es obligatorio",
            })}
            className="w-full p-3 rounded bg-gray-700 text-white"
          >
            <option value="">Seleccione un tipo</option>
            <option value="Administrador">Administrador</option>
            <option value="User">User</option>
          </select>
          {errors.type && (
            <p className="text-red-500 text-sm -mt-3 mb-2">{errors.type.message}</p>
          )}

          <button
            type="submit"
            className="bg-red-600 text-white w-full p-3 rounded mt-4 text-lg font-semibold hover:bg-red-700 transition"
          >
            Crear Usuario
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterFormAdmin;
