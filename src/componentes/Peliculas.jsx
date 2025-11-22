import React from "react";

const Peliculas = () => {
  const movie = {
    original_title: "Storm",
    detalle:
      "Storm es una película estrenada en 2022 con una calificación de 6.7 en TMDB.",
    actores:
      "Ane Dahl Torp, Ane Skumsvoll, Axel Aubert, Cato Skimten Storengen, Ella Maren Alfsvåg Jørgensen, Marianne Stormoen, Modou Bah",
    poster:
      "https://image.tmdb.org/t/p/w300//3Wycxfq5Tn0J4Nz3jZ4YziayBtX.jpg",
    genres: "Drama",
    director: "Erika Calmeyer",
    type: "movies",
    link: "https://www.youtube.com/embed/iwfZ2mPIL20",
  };

  return (
    <div className="min-h-screen bg-black text-white relative">

      {/* Fondo difuminado */}
      <div
        className="absolute inset-0 bg-cover bg-center blur-xl opacity-40"
        style={{ backgroundImage: `url(${movie.poster})` }}
      ></div>

      <div className="relative z-10 max-w-6xl mx-auto p-6">

        {/* Contenedor de datos */}
        <div className="flex flex-col md:flex-row gap-8 bg-neutral-900/90 p-6 rounded-2xl border border-neutral-700 shadow-xl backdrop-blur-md">

          {/* Poster */}
          <div className="md:w-1/3 w-full flex justify-center">
            <img
              src={movie.poster}
              alt={movie.original_title}
              className="w-full object-contain rounded-xl shadow-lg"
            />
          </div>

          {/* Info */}
          <div className="md:w-2/3 flex flex-col gap-5">
            <h1 className="text-5xl font-bold drop-shadow-lg">
              {movie.original_title}
            </h1>

            <p className="text-gray-300 text-lg leading-relaxed">{movie.detalle}</p>

            <p>
              <span className="font-semibold text-gray-400">Género:</span>{" "}
              {movie.genres}
            </p>

            <p>
              <span className="font-semibold text-gray-400">Director:</span>{" "}
              {movie.director}
            </p>

            <p>
              <span className="font-semibold text-gray-400">Actores:</span>{" "}
              {movie.actores}
            </p>

            {/* BOTÓN FAVORITO (Bootstrap + Tailwind) */}
            <div className="flex justify-center mt-2">
              <button className="btn btn-danger px-3 py-3 rounded-lg font-semibold bg-red-700 hover:bg-red-800 border-0">
                <i className="bi bi-heart-fill me-1"></i> Agregar a Favorito
              </button>
            </div>
          </div>
        </div>
        {/* Trailer */}
        <div className="mt-10 bg-neutral-900/90 p-6 rounded-2xl shadow-xl border border-neutral-700">

          <h2 className="text-xl font-semibold mb-4 text-gray-300">
            Ver trailer de <span className="text-white">{movie.original_title}</span>
          </h2>

          <div className="w-full aspect-video rounded-xl overflow-hidden shadow-xl border border-neutral-700">
            <iframe
              className="w-full h-full"
              src={movie.link}
              title={`Trailer de ${movie.original_title}`}
              allowFullScreen
            ></iframe>
          </div>
        </div>

      </div>

    </div>
  );
};

export default Peliculas;
