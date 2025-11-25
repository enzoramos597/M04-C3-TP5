import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { API_PELICULAS } from "../../services/api";
import { Link } from "react-router-dom";

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
      const res = await axios.get(API_PELICULAS);
      const peliculas = res.data;

      const tituloExiste = peliculas.some(
        (p) =>
          p.original_title.trim().toLowerCase() ===
          data.original_title.trim().toLowerCase()
      );

      if (tituloExiste) {
        toast.error("Ya existe una película con ese título ❌");
        return;
      }

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
        estado: "activo",
      };

      await axios.post(`${API_PELICULAS}/peliculas`, newMovie);

      toast.success("Película cargada correctamente 🎬");

      await Swal.fire({
        title: "¡Película guardada!",
        text: "La película fue subida correctamente.",
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
    <div className="min-h-screen flex items-center justify-center px-4 bg-black/90 ">
      <div className="relative bg-neutral-900 p-8 rounded-xl shadow-lg w-full max-w-xl border-2 border-red-800 mt-6 mb-4">

        {/* X de cerrar */}
        <Link
          to="/peliculas"
          className="absolute top-4 right-4 text-gray-400 hover:text-red-600 text-3xl transition"
        >
          &times;
        </Link>

        <h2 className="text-3xl font-bold text-center text-white mb-8">
          Subir Película
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">

          {/* Campo Input Reutilizable */}
          {[
            { id: "original_title", label: "Título Original", error: errors.original_title },
            { id: "detalle", label: "Detalle", textarea: true, error: errors.detalle },
            { id: "actores", label: "Actores (separados por coma)", error: errors.actores },
            { id: "poster", label: "Poster (URL)", error: errors.poster },
            { id: "genero", label: "Género (separados por coma)", error: errors.genero },
            { id: "Director", label: "Director(es)", error: errors.Director },
            { id: "type", label: "Tipo (Película, Serie…)", error: errors.type },
            { id: "anio", label: "Año", number: true, error: errors.anio },
            { id: "link", label: "Link de reproducción", error: errors.link },
          ].map((field) => (
            <div key={field.id} className="flex flex-col gap-1">
              <label className="text-white text-sm">{field.label}</label>

              {field.textarea ? (
                <textarea
                  {...register(field.id, { required: `El campo ${field.label} es obligatorio` })}
                  className="p-3 rounded bg-neutral-800 border border-neutral-700 text-white h-24 focus:outline-none focus:border-red-600 transition"
                ></textarea>
              ) : (
                <input
                  type={field.number ? "number" : "text"}
                  {...register(field.id, { required: `El campo ${field.label} es obligatorio` })}
                  className="p-3 rounded bg-neutral-800 border border-neutral-700 text-white focus:outline-none focus:border-red-600 transition"
                />
              )}

              {field.error && (
                <p className="text-red-500 text-sm">{field.error.message}</p>
              )}
            </div>
          ))}

          {/* Estado */}
          <div>
            <label className="text-white text-sm">Estado:</label>
            <br />
            <input
              type="text"
              value="activo"
              disabled
              className="p-3 bg-neutral-800 border border-neutral-700 text-gray-400 rounded cursor-not-allowed"
            />
            <input type="hidden" {...register("estado")} value="activo" />
          </div>

          <button
            type="submit"
            className="bg-red-600 hover:bg-red-700 p-3 rounded text-lg font-semibold transition"
          >
            Subir Película
          </button>
        </form>
      </div>
    </div>
  );
};

export default UploadMovie;
