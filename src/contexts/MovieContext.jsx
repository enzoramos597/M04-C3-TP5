import { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";

const MovieContext = createContext();

export const useMovies = () => useContext(MovieContext);

export const MovieProvider = ({ children }) => {
  const [misPeliculas, setMisPeliculas] = useState([]);

  const addMovie = (movie) => {
    const exist = misPeliculas.some((m) => m.id === movie.id);

    if (exist) {
      toast.warning("La película ya está en tu lista.");
      return;
    }

    setMisPeliculas([...misPeliculas, movie]);
    toast.success("Película agregada a tu lista.");
  };

  const removeMovie = (id) => {
    setMisPeliculas(misPeliculas.filter((m) => m.id !== id));
    toast.info("Película eliminada de tu lista.");
  };

  return (
    <MovieContext.Provider value={{ misPeliculas, addMovie, removeMovie }}>
      {children}
    </MovieContext.Provider>
  );
};
