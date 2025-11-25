import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import axios from "axios";
import { useProfiles } from "../../contexts/ProfileContext";

const EditProfileUser = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { updateProfile } = useProfiles();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  // Crear iniciales
  const getInitials = (nombre, apellido) => {
    const n = nombre?.charAt(0)?.toUpperCase() ?? "";
    const a = apellido?.charAt(0)?.toUpperCase() ?? "";
    return n + a;
  };

  // 🔵 Cargar valores actuales
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(
          `https://69153a6384e8bd126af9262c.mockapi.io/users/${id}`
        );

        const user = res.data;

        setValue("email", user.correo);
        setValue("firstname", user.name);
        setValue("lastname", user.apellido);
        setValue("password", user.contrasenia);
        setValue("avatar", user.avatar ?? "");
      } catch (error) {
        toast.error("Error al cargar el usuario");
        console.error(error);
      }
    };

    fetchUser();
  }, [id, setValue]);

  // 🟣 Guardar cambios
  const onSubmit = async (data) => {
    try {
      let finalAvatar = data.avatar?.trim();

      // Validar formato si viene avatar
      if (finalAvatar) {
        const isValidImage = /\.(jpg|jpeg|png|webp)$/i.test(finalAvatar);
        if (!isValidImage) {
          toast.error("El avatar debe ser una imagen JPG, JPEG, PNG o WEBP");
          return;
        }
      }

      // Si no hay avatar → iniciales
      if (!finalAvatar) {
        finalAvatar = getInitials(data.firstname, data.lastname);
      }

      const updatedUser = {
        correo: data.email,
        contrasenia: data.password,
        name: data.firstname,
        apellido: data.lastname,
        avatar: finalAvatar,
      };

      await updateProfile(id, updatedUser);

      toast.success("Perfil actualizado correctamente 🎉");

      await Swal.fire({
        title: "¡Perfil actualizado!",
        text: "Los cambios fueron guardados.",
        icon: "success",
        confirmButtonColor: "#e50914",
      });

      navigate("/");
    } catch (error) {
      toast.error("Error al actualizar el usuario");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-black/70 ">
      <div className="bg-black/90 p-8 rounded-lg w-full max-w-md shadow-lg relative mt-4 mb-4">

        <Link
          to="/"
          className="absolute top-3 right-3 text-gray-400 hover:text-red-700 text-2xl"
          title="Cerrar"
        >
          &times;
        </Link>

        <h2 className="text-3xl font-bold text-white mb-6 text-center">
          Editar Perfil
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">

          {/* EMAIL (NO EDITABLE) */}
          <label className="text-white text-sm">Correo electrónico:</label>
          <input
            type="email"
            disabled
            {...register("email")}
            className="w-full p-3 rounded bg-gray-700 text-gray-400 cursor-not-allowed"
          />
           <label className="text-white text-sm">Contraseña:</label>
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
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}

          {/* FIRSTNAME */}
          <label className="text-white text-sm">Nombre:</label>
          <input
            {...register("firstname", {
              required: "El nombre es obligatorio",
              maxLength: { value: 20, message: "Máximo 20 caracteres" },
            })}
            placeholder="Nombre"
            className="w-full p-3 rounded bg-gray-700 text-white"
          />
          {errors.firstname && (
            <p className="text-red-500 text-sm">{errors.firstname.message}</p>
          )}

          {/* LASTNAME */}
           <label className="text-white text-sm">Apellido:</label>
          <input
            {...register("lastname", {
              required: "El apellido es obligatorio",
              maxLength: { value: 20, message: "Máximo 20 caracteres" },
            })}
            placeholder="Apellido"
            className="w-full p-3 rounded bg-gray-700 text-white"
          />
          {errors.lastname && (
            <p className="text-red-500 text-sm">{errors.lastname.message}</p>
          )}

          {/* AVATAR URL OPCIONAL */}
          <div>
            <label className="text-white text-sm">URL de avatar (opcional)</label>
            <input
              type="text"
              {...register("avatar")}
              placeholder="https://miavatar.com/foto.png"
              className="w-full p-2 mt-1 rounded bg-gray-700 text-white"
            />
          </div>

          {/* BOTONES */}
          <div className="flex justify-between gap-3 mt-4">
            <button
              type="submit"
              className="bg-red-600 text-white w-1/2 p-3 rounded text-lg font-semibold hover:bg-red-700 transition"
            >
              Guardar
            </button>
            {/* 🔵 TOAST DE CANCELACIÓN */}
            <button
              type="button"
              onClick={() => {
                toast.info("Edición cancelada");
                navigate("/");
              }}
              className="bg-gray-500 text-white w-1/2 p-3 rounded text-lg font-semibold hover:bg-gray-600 transition"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfileUser;
