import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { API_PELICULAS } from "../../services/api"

const UpdateMovie = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm();

  const navigate = useNavigate();
  const { id } = useParams();

  // 👉 CARGAR DATOS DE LA PELÍCULA
  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await axios.get(
          `${API_PELICULAS}/${id}`
        );

        const movie = res.data;

        // Setear los valores en el formulario 👇
        setValue("original_title", movie.original_title);
        setValue("detalle", movie.detalle);
        setValue("actores", movie.actores?.join(", "));
        setValue("poster", movie.poster);
        setValue("genero", movie.genero?.join(", "));
        setValue("Director", movie.Director?.join(", "));
        setValue("type", movie.type?.join(", "));
        setValue("link", movie.link);
        setValue("anio", movie.anio);
        setValue("estado", movie.estado); // 🔥 dropdown
      } catch (err) {
        console.error(err);
        toast.error("Error al cargar la película ❌");
      }
    };

    fetchMovie();
  }, [id, setValue]);

  // 👉 ENVIAR ACTUALIZACIÓN
  const onSubmit = async (data) => {
    try {
      const updatedMovie = {
        ...data,
        actores: data.actores.split(",").map((a) => a.trim()),
        genero: data.genero.split(",").map((g) => g.trim()),
        Director: data.Director.split(",").map((d) => d.trim()),
        type: data.type.split(",").map((t) => t.trim()),
        anio: Number(data.anio)
      };

      await axios.put(
        `${API_PELICULAS}/${id}`,
        updatedMovie
      );

      toast.success("Película actualizada correctamente 🎬");

      await Swal.fire({
        title: "Actualizado ✔",
        text: "Los datos de la película fueron modificados.",
        icon: "success",
        confirmButtonColor: "#e50914"
      });

      navigate("/peliculas");

    } catch (err) {
      console.error(err);
      toast.error("Error al actualizar la película ❌");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white px-4">
      <div className="bg-gray-900 p-6 rounded-xl shadow-lg w-full max-w-lg">

        <h2 className="text-3xl font-bold mb-6 text-center">
          Editar Película
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">

          {/* TITLE */}
          <input
            {...register("original_title", { required: "El título es obligatorio" })}
            placeholder="Título original"
            className="p-3 bg-gray-700 rounded"
          />
          {errors.original_title && <p className="text-red-500">{errors.original_title.message}</p>}

          {/* DETALLE */}
          <textarea
            {...register("detalle", { required: "El detalle es obligatorio" })}
            placeholder="Descripción"
            className="p-3 bg-gray-700 rounded h-24"
          />
          {errors.detalle && <p className="text-red-500">{errors.detalle.message}</p>}

          {/* ACTORES */}
          <input
            {...register("actores")}
            placeholder="Actores separados por coma"
            className="p-3 bg-gray-700 rounded"
          />

          {/* POSTER */}
          <input
            {...register("poster")}
            placeholder="URL del poster"
            className="p-3 bg-gray-700 rounded"
          />

          {/* GENERO */}
          <input
            {...register("genero")}
            placeholder="Géneros separados por coma"
            className="p-3 bg-gray-700 rounded"
          />

          {/* DIRECTOR */}
          <input
            {...register("Director")}
            placeholder="Director(es) separados por coma"
            className="p-3 bg-gray-700 rounded"
          />

          {/* TYPE */}
          <input
            {...register("type")}
            placeholder="Tipo (Película, Serie, Acción...)"
            className="p-3 bg-gray-700 rounded"
          />

          {/* AÑO */}
          <input
            type="number"
            {...register("anio")}
            placeholder="Año"
            className="p-3 bg-gray-700 rounded"
          />

          {/* LINK */}
          <input
            {...register("link")}
            placeholder="Link embed YouTube"
            className="p-3 bg-gray-700 rounded"
          />

          {/* 🔥 ESTADO CON DROPDOWN */}
          <label className="text-sm text-gray-300">Estado</label>
          <select
            {...register("estado")}
            className="p-3 bg-gray-700 rounded text-white"
          >
            <option value="activo">Activo</option>
            <option value="inactivo">Inactivo</option>
          </select>

          {/* BOTÓN SUBMIT */}
          <button
            type="submit"
            className="bg-red-600 hover:bg-red-700 transition p-3 rounded text-lg font-semibold mt-3"
          >
            Actualizar Película
          </button>

          {/* CANCELAR */}
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="bg-gray-600 hover:bg-gray-700 transition p-3 rounded text-lg font-semibold"
          >
            Cancelar
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateMovie;
