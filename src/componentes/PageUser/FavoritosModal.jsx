import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const FavoritosModal = ({ isOpen, onClose }) => {
  const { user, updateUserFavoritos } = useAuth();
  const [favoritos, setFavoritos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isOpen) return;

    let cancelled = false;

    // Defer the state update so we don't call setState synchronously inside the effect.
    Promise.resolve().then(() => {
      if (cancelled) return;

      if (user?.favoritos && Array.isArray(user.favoritos)) {
        setFavoritos(user.favoritos);
      } else {
        const saved = JSON.parse(localStorage.getItem("favoritos")) || [];
        setFavoritos(saved);
      }
    });

    return () => {
      cancelled = true;
    };
  }, [isOpen, user]);

  if (!isOpen) return null;

  const eliminarFavorito = (id) => {
    const nuevos = favoritos.filter((f) => f.id !== id);
    setFavoritos(nuevos);
    localStorage.setItem("favoritos", JSON.stringify(nuevos));
    updateUserFavoritos(nuevos);
  };

  const vaciarFavoritos = () => {
    setFavoritos([]);
    localStorage.setItem("favoritos", JSON.stringify([]));
    updateUserFavoritos([]);
  };

  const irADetalle = (id) => {
    navigate(`/peliculas/${id}`);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black/60 flex justify-center items-center backdrop-blur-sm px-4 z-50"
      onClick={onClose}
    >
      <div
        className="bg-neutral-900 text-white w-[88%] max-w-md rounded-xl p-5 shadow-xl border border-neutral-700 relative z-50 overflow-visible"
        onClick={(e) => e.stopPropagation()}
      >
        {/* BOTÓN CERRAR */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-3xl text-gray-300 hover:text-red-500 transition-all duration-200"
        >
          ✕
        </button>

        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <i className="bi bi-heart-fill text-red-500"></i> Mis Favoritos
        </h2>

        {favoritos.length === 0 ? (
          <div className="py-10 text-center text-gray-400">
            <i className="bi bi-film text-5xl mb-3"></i>
            <p>No tienes favoritos aún</p>
          </div>
        ) : (
          <>
            <div className="max-h-80 overflow-y-auto px-2 pt-2">
              {favoritos.map((fav) => (
                <div
                  key={fav.id}
                  className="flex items-center bg-neutral-800 p-3 rounded-lg mb-3 shadow relative cursor-pointer
                    border-2 border-transparent hover:border-red-500 transition-all duration-200
                    hover:scale-[1.03] overflow-visible"
                >
                  {/* Clic a detalle */}
                  <div
                    onClick={() => irADetalle(fav.id)}
                    className="flex items-center flex-1"
                  >
                    <img
                      src={fav.poster || fav.image || fav.image_url}
                      alt={fav.title}
                      className="w-16 h-20 object-cover rounded-md"
                    />

                    <div className="ml-3">
                      <p className="font-semibold text-sm">{fav.title}</p>
                    </div>
                  </div>

                  {/* Tachito */}
                  <button
                    className="text-red-500 hover:text-red-300 text-xl ml-2"
                    onClick={() => eliminarFavorito(fav.id)}
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                </div>
              ))}
            </div>

            <button
              className="mt-4 w-full py-2 bg-red-600 hover:bg-red-500 rounded-lg font-semibold transition"
              onClick={vaciarFavoritos}
            >
              Vaciar favoritos
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default FavoritosModal;
