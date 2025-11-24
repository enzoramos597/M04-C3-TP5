import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { API_PELICULAS } from "../../services/api"

const UploadMovie = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // Convierte automáticamente links a embed
  const getEmbedUrl = (url) => {
    if (!url) return "";
    if (url.includes("watch?v=")) return url.replace("watch?v=", "embed/");
    if (url.includes("/shorts/")) return url.replace("/shorts/", "/embed/");
    return url;
  };

  const onSubmit = async (data) => {
    try {
      // 👉 1. OBTENER TODAS LAS PELÍCULAS Y CHEQUEAR DUPLICADO
      const res = await axios.get(API_PELICULAS);
      const peliculas = res.data;

      const tituloExiste = peliculas.some(
        (p) => p.original_title.trim().toLowerCase() === data.original_title.trim().toLowerCase()
      );

      if (tituloExiste) {
        toast.error("Ya existe una película con ese título ❌");
        return;
      }

      // 👉 2. CREAR PELÍCULA
      const newMovie = {
        original_title: data.original_title,
        detalle: data.detalle,
        actores: data.actores.split(",").map((a) => a.trim()),
        poster: data.poster,
        genero: data.genero.split(",").map((g) => g.trim()),
        Director: data.Director.split(",").map((d) => d.trim()),
        type: data.type.split(",").map((t) => t.trim()),
        link: getEmbedUrl(data.link),
        anio: Number(data.anio),

        // 👇 SIEMPRE cargada como activa
        estado: "activo",
      };

      await axios.post(`${API_PELICULAS}/peliculas`, newMovie);

      toast.success("Película cargada correctamente 🎬")

      await Swal.fire({
        title: "¡Película guardada!",
        text: "La película fue subida a la base de datos.",
        icon: "success",
        confirmButtonColor: "#e50914",
      });

      reset();

    } catch (error) {
      console.error(error);
      toast.error("Error al guardar la película");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white px-4">
      <div className="bg-gray-900 p-6 rounded-xl shadow-lg w-full max-w-lg">
        <h2 className="text-3xl font-bold mb-6 text-center">Subir Película</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">

          {/* TÍTULO */}
          <input
            {...register("original_title", {
              required: "El título es obligatorio",
              minLength: { value: 2, message: "Mínimo 2 caracteres" },
            })}
            placeholder="Título original"
            className="p-3 bg-gray-700 rounded"
          />
          {errors.original_title && (<p className="text-red-500 text-sm">{errors.original_title.message}</p>)}

          {/* DETALLE */}
          <textarea
            {...register("detalle", {
              required: "El detalle es obligatorio",
              minLength: { value: 10, message: "Debe tener mínimo 10 caracteres" },
            })}
            placeholder="Detalle / Descripción"
            className="p-3 bg-gray-700 rounded h-24"
          ></textarea>
          {errors.detalle && (<p className="text-red-500 text-sm">{errors.detalle.message}</p>)}

          {/* ACTORES */}
          <input
            {...register("actores", { required: "Debe ingresar al menos un actor" })}
            placeholder="Actores (separados por coma)"
            className="p-3 bg-gray-700 rounded"
          />
          {errors.actores && (<p className="text-red-500 text-sm">{errors.actores.message}</p>)}

          {/* POSTER */}
          <input
            {...register("poster", { required: "La URL del poster es obligatoria" })}
            placeholder="Poster (URL)"
            className="p-3 bg-gray-700 rounded"
          />
          {errors.poster && (<p className="text-red-500 text-sm">{errors.poster.message}</p>)}

          {/* GÉNERO */}
          <input
            {...register("genero", { required: "Debe ingresar al menos un género" })}
            placeholder="Género (separados por coma)"
            className="p-3 bg-gray-700 rounded"
          />
          {errors.genero && (<p className="text-red-500 text-sm">{errors.genero.message}</p>)}

          {/* DIRECTOR */}
          <input
            {...register("Director", { required: "Debe ingresar al menos un director" })}
            placeholder="Director(es) (separados por coma)"
            className="p-3 bg-gray-700 rounded"
          />
          {errors.Director && (<p className="text-red-500 text-sm">{errors.Director.message}</p>)}

          {/* TYPE */}
          <input
            {...register("type", { required: "Debe ingresar el tipo" })}
            placeholder="Tipo (Acción, Serie, Película...)"
            className="p-3 bg-gray-700 rounded"
          />
          {errors.type && (<p className="text-red-500 text-sm">{errors.type.message}</p>)}

          {/* AÑO */}
          <input
            type="number"
            {...register("anio", {
              required: "El año es obligatorio",
              min: { value: 1800, message: "No puede ser menor a 1800" },
              max: { value: 2100, message: "No puede ser mayor a 2100" },
            })}
            placeholder="Año de la película"
            className="p-3 bg-gray-700 rounded"
          />
          {errors.anio && (<p className="text-red-500 text-sm">{errors.anio.message}</p>)}

          {/* LINK */}
          <input
            {...register("link", {
              required: "El link es obligatorio",
              pattern: {
                value: /^https?:\/\/.+/i,
                message: "Debe ser un enlace válido",
              },
            })}
            placeholder="Link de reproducción (YouTube / Shorts)"
            className="p-3 bg-gray-700 rounded"
          />
          {errors.link && (<p className="text-red-500 text-sm">{errors.link.message}</p>)}

          {/* ESTADO (visible + oculto) */}
          <label className="text-sm text-gray-300">Estado</label>

          <input
            type="text"
            value="activo"
            disabled
            className="p-3 bg-gray-700 rounded text-gray-400 cursor-not-allowed"
          />

          <input
            type="hidden"
            {...register("estado")}
            value="Activo"
          />

          <button
            type="submit"
            className="bg-red-600 hover:bg-red-700 transition p-3 rounded text-lg font-semibold mt-3"
          >
            Subir Película
          </button>
        </form>
      </div>
    </div>
  );
};

export default UploadMovie
