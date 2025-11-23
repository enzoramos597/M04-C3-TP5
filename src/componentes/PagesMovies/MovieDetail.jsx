import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";
import { toast } from "react-toastify";
import { API_USERS, API_PELICULAS } from "../../services/api";

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const { user, refreshUser } = useAuth();
  const [loading, setLoading] = useState(false);

  // 1) Cargar película al montar
  useEffect(() => {
    let mounted = true;
    const loadMovie = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `${API_PELICULAS}/${id}`
        );
        if (!mounted) return;
        setMovie(res.data);
      } catch (err) {
        console.error("Error al cargar película:", err);
        toast.error("Error cargando la película");
      } finally {
        if (mounted) setLoading(false);
      }
    };
    loadMovie();
    return () => {
      mounted = false;
    };
  }, [id]);

  if (loading) return <p className="text-white p-10">Cargando...</p>;
  if (!movie) return <p className="text-white p-10">No se encontró la película.</p>;

  // 2) Estado derivado: si está en favoritos (NO usar setState dentro de effect)
  const estaEnFavoritos =
    Array.isArray(user?.favoritos) &&
    user.favoritos.some((f) => String(f.id) === String(movie.id));

  // 3) Agregar a favoritos
  const agregarFavorito = async () => {
    if (!user) {
      toast.error("Debes iniciar sesión para agregar favoritos");
      return;
    }

    try {
      const favoritosActuales = Array.isArray(user.favoritos) ? user.favoritos : [];

      // prevenir duplicados por si acaso
      if (favoritosActuales.some((f) => String(f.id) === String(movie.id))) {
        toast.info("Ya está en favoritos");
        return;
      }

      const nuevoFav = {
        id: String(movie.id),
        title: movie.original_title,
        poster: movie.poster,
      };

      const actualizados = [...favoritosActuales, nuevoFav];

      await axios.put(
        `${API_USERS}/${user.id}`,
        {
          ...user,
          favoritos: actualizados,
        }
      );

      await refreshUser(user.id); // sincroniza el contexto
      toast.success("Película agregada a favoritos ❤️");
    } catch (error) {
      console.error("Error al agregar favorito:", error);
      toast.error("Error al agregar a favoritos");
    }
  };

  // 4) Eliminar de favoritos
  const eliminarFavorito = async () => {
    if (!user) {
      toast.error("Debes iniciar sesión");
      return;
    }

    try {
      const favoritosActuales = Array.isArray(user.favoritos) ? user.favoritos : [];
      const nuevos = favoritosActuales.filter((f) => String(f.id) !== String(movie.id));

      await axios.put(
        `${API_USERS}/${user.id}`,
        {
          ...user,
          favoritos: nuevos,
        }
      );

      await refreshUser(user.id);
      toast.info("Película eliminada de favoritos ❌");
    } catch (error) {
      console.error("Error al eliminar favorito:", error);
      toast.error("Error al eliminar de favoritos");
    }
  };

  // helper: convertir links youtube a embed
  const toEmbedUrl = (url) => {
    if (!url) return "";
    if (url.includes("embed")) return url;
    if (url.includes("watch?v=")) return url.replace("watch?v=", "embed/");
    if (url.includes("youtu.be/")) return url.replace("youtu.be/", "www.youtube.com/embed/");
    return url;
  };

  return (
    <div className="min-h-screen bg-black text-white relative">
      <div
        className="absolute inset-0 bg-cover bg-center blur-xl opacity-40"
        style={{ backgroundImage: `url(${movie.poster})` }}
      ></div>

      <div className="relative z-10 max-w-6xl mx-auto p-6">
        <div className="flex flex-col md:flex-row gap-8 bg-neutral-900/90 p-6 rounded-2xl border border-neutral-700 shadow-xl">
          <div className="md:w-1/3 w-full flex justify-center">
            <img
              src={movie.poster}
              alt={movie.original_title}
              className="w-full object-contain rounded-xl shadow-lg"
            />
          </div>

          <div className="md:w-2/3 flex flex-col gap-5">
            <h1 className="text-5xl font-bold">{movie.original_title}</h1>

            <p className="text-gray-300 text-lg">{movie.detalle}</p>

            <p>
              <span className="font-bold text-gray-400">Género:</span>{" "}
              {movie.genero?.join(", ")}
            </p>

            <p>
              <span className="font-bold text-gray-400">Director:</span>{" "}
              {movie.Director?.join(", ")}
            </p>

            <p>
              <span className="font-bold text-gray-400">Actores:</span>{" "}
              {movie.actores?.join(", ")}
            </p>

            <div className="flex justify-center mt-2">
              {estaEnFavoritos ? (
                <button
                  onClick={eliminarFavorito}
                  className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-md font-semibold text-sm flex items-center gap-2"
                >
                  <i className="bi bi-trash"></i> Quitar de Favoritos
                </button>
              ) : (
                <button
                  onClick={agregarFavorito}
                  className="px-4 py-2 bg-red-700 hover:bg-red-800 rounded-md font-semibold text-sm flex items-center gap-2"
                >
                  <i className="bi bi-heart-fill"></i> Agregar a Favoritos
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="mt-10 bg-neutral-900/90 p-6 rounded-2xl border border-neutral-700">
          <h2 className="text-xl font-semibold mb-4 text-gray-300">
            Ver trailer de <span className="text-white">{movie.original_title}</span>
          </h2>

          <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-neutral-700">
            <iframe
              src={toEmbedUrl(movie.link)}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
