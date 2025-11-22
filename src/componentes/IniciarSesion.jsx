import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../contexts/AuthContext";

const IniciarSesion = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const { register, handleSubmit, formState: { errors }} = useForm();

  const onSubmit = async (data) => {
    const user = await login(data.email, data.password);

    if (!user) {
      toast.error("Credenciales incorrectas ❌");
      return;
    }

    toast.success(`Bienvenido ${user.name} 🎉`)
    navigate("/profileselector");
  }

  return (
    <div className="flex justify-center items-center min-h-[80vh] w-full">
      <div className="bg-neutral-900 w-full max-w-md p-8 rounded-lg relative">

        <Link
          to="/"
          className="absolute top-3 right-3 text-gray-400 hover:text-red-700 text-2xl"
        >
          &times;
        </Link>

        <h2 className="text-white text-3xl mb-6 text-center font-bold">Iniciar Sesión</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">

          <input
            type="email"
            {...register("email", {
              required: "El correo es obligatorio",
              pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Correo inválido" }
            })}
            placeholder="Correo electrónico"
            className="p-3 rounded bg-neutral-800 text-white border border-neutral-700"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

          <input
            type="password"
            {...register("password", {
              required: "La contraseña es obligatoria",
              minLength: { value: 6, message: "Mínimo 6 caracteres" }
            })}
            placeholder="Contraseña"
            className="p-3 rounded bg-neutral-800 text-white border border-neutral-700"
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}

          <button
            type="submit"
            className="bg-red-600 py-3 rounded text-white font-semibold hover:bg-red-500"
          >
            Iniciar sesión
          </button>
        </form>
      </div>
    </div>
  );
};

export default IniciarSesion;
