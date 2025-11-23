import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const ListaPelicula = () => {
  const [peliculas, setPeliculas] = useState([]);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const { user } = useAuth();
  const isAdmin = user?.type === "Administrador";

  const moviesPerPage = 12; // 4 columnas x 3 filas

  useEffect(() => {
    const fetchPeliculas = async () => {
      const res = await axios.get(
        "https://69153a6384e8bd126af9262c.mockapi.io/peliculas"
      );

      // 👉 FILTRAR SOLO LAS ACTIVAS
      const activas = res.data.filter(
        (p) => p.estado?.toLowerCase() === "activo"
      );

      setPeliculas(activas);
    };
    fetchPeliculas();
  }, []);

  const startIndex = (page - 1) * moviesPerPage;
  const currentMovies = peliculas.slice(startIndex, startIndex + moviesPerPage);
  const totalPages = Math.ceil(peliculas.length / moviesPerPage);

  return (
    <div className="min-h-screen bg-black/60 backdrop-blur-sm p-6">
      <h2 className="text-3xl font-bold mb-4 text-white text-center drop-shadow-lg">
        Películas Activas
      </h2>

      {/* GRID 4x3 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {currentMovies.map((peli) => {
          const year = peli.anio || "-";

          return (
            <div
              key={peli.id}
              className="relative rounded-lg cursor-pointer hover:scale-105 transition shadow-xl"
            >
              <div
                onClick={() => navigate(`/peliculas/${peli.id}`)}
                className="relative group overflow-hidden rounded-lg"
              >
                {/* AÑO */}
                <span className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded shadow-lg">
                  {year}
                </span>

                {/* POSTER */}
                <img
                  src={peli.poster}
                  alt={peli.original_title}
                  className="w-64 h-64 object-contain rounded-lg"
                />

                {/* Hover NETFLIX */}
                <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition flex flex-col justify-center items-center p-3">
                  <h3 className="text-lg font-bold text-white text-center drop-shadow-lg">
                    {peli.original_title}
                  </h3>
                  <p className="text-sm mt-1 text-gray-300">
                    Director: {peli.Director?.join(", ") || "Sin información"}
                  </p>
                </div>
              </div>

              {/* INFO */}
              <div className="mt-2 px-1 text-center">
                <h3 className="text-white font-semibold truncate">
                  {peli.original_title}
                </h3>

                <p className="text-gray-400 text-sm truncate">
                  {peli.genero?.join(", ") || "Sin género"}
                </p>
              </div>

              {/* 🔥 BOTÓN EDITAR SOLO PARA ADMIN */}
              {isAdmin && (
                <button
                  onClick={() => navigate(`/updatemovie/${peli.id}`)}
                  className="absolute top-2 right-2 bg-blue-600 text-white px-2 py-1 rounded text-xs shadow-lg hover:bg-blue-500 transition"
                >
                  Editar
                </button>
              )}
            </div>
          );
        })}
      </div>

      {/* PAGINACIÓN */}
      <div className="flex justify-center gap-4 mt-6 text-white">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="px-4 py-2 bg-red-600 rounded disabled:bg-gray-600"
        >
          ◀ Anterior
        </button>

        <span>
          Página {page} de {totalPages}
        </span>

        <button
          disabled={page === totalPages || currentMovies.length < moviesPerPage}
          onClick={() => setPage(page + 1)}
          className="px-4 py-2 bg-red-600 rounded disabled:bg-gray-600"
        >
          Siguiente ▶
        </button>
      </div>
    </div>
  );
};

export default ListaPelicula;
