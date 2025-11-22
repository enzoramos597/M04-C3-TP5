import { Link } from "react-router-dom";

const IniciarSesion = () => {
  return (
    <div className="flex justify-center items-center min-h-[80vh] w-full">
      <div className="bg-neutral-900 w-full max-w-md rounded-lg shadow-lg p-8 relative">

        {/* Botón "X" */}
        <Link 
          to="/" 
          className="absolute top-3 right-3 text-gray-400 hover:text-red-700 text-2xl"
          title="Cerrar"
        >
          &times;
        </Link>

        <h2 className="text-3xl font-bold text-white mb-6 text-center">Iniciar sesión</h2>

        <form className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Email"
            className="w-full p-3 rounded bg-neutral-800 text-white border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-red-600"
          />
          <input
            type="password"
            placeholder="Contraseña"
            className="w-full p-3 rounded bg-neutral-800 text-white border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-red-600"
          />
          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-500 py-3 rounded font-semibold text-white transition"
          >
            Iniciar sesión
          </button>
        </form>

        <div className="flex justify-between items-center mt-4 text-sm text-gray-400">
          <label className="flex items-center gap-2">
            <input type="checkbox" className="accent-red-600" />
            Recordarme
          </label>
          <Link to="#" className="hover:underline text-gray-300">
            ¿Olvidaste la contraseña?
          </Link>
        </div>

        <p className="text-gray-400 mt-6 text-sm">
          ¿Primera vez en PeliFlix?
          <Link
            to="/registrar-usuario"
            className="text-white font-semibold hover:underline ml-1"
          >
            Suscríbete ya.
          </Link>
        </p>

      </div>
    </div>
  );
};

export default IniciarSesion;
