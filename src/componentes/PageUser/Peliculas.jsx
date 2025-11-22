import React from 'react'

const Peliculas = () => {
    const movie = {
        original_title: "Storm",
        detalle:
            "Storm es una película estrenada en 2022 con una calificación de 6.7 en TMDB.",
        actores:
            "Ane Dahl Torp, Ane Skumsvoll, Axel Aubert, Cato Skimten Storengen, Ella Maren Alfsvåg Jørgensen, Marianne Stormoen, Modou Bah",
        poster: "https://image.tmdb.org/t/p/w300//3Wycxfq5Tn0J4Nz3jZ4YziayBtX.jpg",
        genres: "Drama",
        director: "Erika Calmeyer",
        type: "movies",
        link: "https://www.youtube.com/watch?v=iwfZ2mPIL20",
    };

    return (
        <div className="min-h-screen bg-black text-white p-6 flex justify-center">
            <div className="max-w-5xl w-full bg-neutral-900/80 border border-neutral-700 rounded-2xl shadow-2xl overflow-hidden p-6">

                <div className="flex flex-col md:flex-row items-center md:items-start gap-6">

                    <div className=" w-full flex justify-center items-start p-4">
                        <img
                            src={movie.poster}
                            alt={movie.original_title}
                            className="w-56 rounded-xl shadow-lg object-contain"
                        />
                    </div>

                    {/* Info */}
                    <div className="md:w-2/3 flex flex-col gap-4">
                        <h1 className="text-4xl font-bold">{movie.original_title}</h1>
                        <p className="text-gray-300">{movie.detalle}</p>

                        <p>
                            <span className="font-semibold text-gray-400">Género:</span> {movie.genres}
                        </p>
                        <p>
                            <span className="font-semibold text-gray-400">Director:</span> {movie.director}
                        </p>
                        <p>
                            <span className="font-semibold text-gray-400">Actores:</span> {movie.actores}
                        </p>

                        {/* Botón Trailer */}
                        <a
                            href={movie.link}
                            target="_blank"
                            className="mt-4 inline-block bg-red-600 hover:bg-red-700 transition px-5 py-3 rounded-xl font-semibold"
                        >
                            ▶ Ver Trailer
                        </a>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Peliculas;
