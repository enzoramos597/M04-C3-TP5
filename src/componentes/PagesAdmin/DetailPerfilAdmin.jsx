import { useParams, Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import Swal from "sweetalert2"
import { toast } from "react-toastify"
import { useProfiles } from "../../contexts/ProfileContext"
import axios from "axios"
import { API_USERS } from "../../services/api"

const DetailPerfilAdmin = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { updateProfile } = useProfiles()

  const [user, setUser] = useState(null)

  // ============================
  //  CARGAR USUARIO POR ID
  // ============================
  useEffect(() => {
    axios
      .get(`${API_USERS}/${id}`)
      .then((res) => setUser(res.data))
      .catch(() => toast.error("Error al cargar el usuario"))
  }, [id])

  // ============================
  //  HANDLE CHANGE
  // ============================
  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  // ============================
  // GENERAR INICIALES (si no hay avatar)
  // ============================
  const getInitials = (name, apellido) => {
    if (!name || !apellido) return "NN";
    return (
      name.trim().charAt(0).toUpperCase() +
      apellido.trim().charAt(0).toUpperCase()
    )
  }

  // ============================
  // GUARDAR CAMBIOS
  // ============================
  const guardarCambios = async () => {
    // Confirmación
    const confirm = await Swal.fire({
      title: "¿Está seguro?",
      text: "Va a modificar este usuario.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e50914",
      cancelButtonColor: "#555",
      confirmButtonText: "Sí, modificar",
      cancelButtonText: "Cancelar",
    });

    if (!confirm.isConfirmed) return;

    try {
      let finalAvatar = user.avatar?.trim()

      // VALIDAR IMAGEN
      if (finalAvatar) {
        const isValidImage = /\.(jpg|jpeg|png|webp)$/i.test(finalAvatar)
        if (!isValidImage) {
          toast.error("El avatar debe ser JPG, JPEG, PNG o WEBP")
          return
        }
      }

      // SI NO HAY AVATAR → INICIALES
      if (!finalAvatar) {
        finalAvatar = getInitials(user.name, user.apellido)
      }

      const updatedUser = {
        name: user.name,
        apellido: user.apellido,
        correo: user.correo,
        type: user.type,
        estado: Number(user.estado),
        avatar: finalAvatar,
      };

      // USAR UPDATEPROFILE DEL CONTEXTO
      await updateProfile(id, updatedUser);

      toast.success("Usuario modificado correctamente 🎉");

      await Swal.fire({
        title: "¡Usuario modificado!",
        text: "Los cambios fueron guardados exitosamente.",
        icon: "success",
        confirmButtonColor: "#e50914",
      });

      navigate("/gestion-usuarios")
    } catch (error) {
      toast.error("Error al actualizar el usuario")
      console.error(error)
    }
  };

  if (!user) return <p className="text-white">Cargando usuario...</p>

  return (
    <div className="min-h-screen bg-cover bg-center flex items-center justify-center p-4 bg-black/90">
      <div className="bg-black/80 text-white p-8 rounded-xl shadow-xl w-full max-w-lg border border-red-700 relative">
        
        {/* Botón cerrar */}
        <Link
          to="/gestion-usuarios"
          className="absolute top-3 right-4 text-gray-400 hover:text-red-600 text-3xl"
        >
          &times;
        </Link>

        <h2 className="text-3xl font-bold text-center mb-6">Perfil del Usuario</h2>

        {/* Avatar Preview */}
        <div className="flex justify-center mb-4">
          <img
            src={user.avatar}
            alt="Avatar"
            className="w-24 h-24 rounded-full border-2 border-red-600 object-cover"
            onError={(e) => (e.target.src = "/default-avatar.png")}
          />
        </div>

        {/* ID */}
        <label className="text-gray-300 text-sm">ID</label>
        <input
          type="text"
          value={user.id}
          disabled
          className="w-full p-3 rounded bg-gray-700 text-gray-400 cursor-not-allowed mb-4"
        />

        {/* Nombre */}
        <label className="text-gray-300 text-sm">Nombre</label>
        <input
          type="text"
          name="name"
          value={user.name || ""}
          onChange={handleChange}
          className="w-full p-3 rounded bg-gray-700 text-white mb-4"
        />

        {/* Apellido */}
        <label className="text-gray-300 text-sm">Apellido</label>
        <input
          type="text"
          name="apellido"
          value={user.apellido || ""}
          onChange={handleChange}
          className="w-full p-3 rounded bg-gray-700 text-white mb-4"
        />

        {/* Correo */}
        <label className="text-gray-300 text-sm">Correo</label>
        <input
          type="email"
          name="correo"
          value={user.correo || ""}
          onChange={handleChange}
          className="w-full p-3 rounded bg-gray-700 text-white mb-4"
        />

        {/* Tipo */}
        <label className="text-gray-300 text-sm">Tipo de Usuario</label>
        <input
          type="text"
          name="type"
          value={user.type || ""}
          onChange={handleChange}
          className="w-full p-3 rounded bg-gray-700 text-white mb-4"
        />

        {/* Estado */}
        <label className="text-gray-300 text-sm">Estado</label>
        <select
          name="estado"
          value={user.estado}
          onChange={handleChange}
          className="w-full p-3 rounded bg-gray-700 text-white mb-4"
        >
          <option value={1}>Activo (1)</option>
          <option value={0}>Inactivo (0)</option>
        </select>

        {/* Avatar */}
        <label className="text-gray-300 text-sm">Avatar (URL)</label>
        <input
          type="text"
          name="avatar"
          value={user.avatar || ""}
          onChange={handleChange}
          className="w-full p-3 rounded bg-gray-700 text-white mb-4"
        />

        {/* BOTONES */}
        <div className="flex gap-4 mt-4">
          <button
            onClick={guardarCambios}
            className="bg-red-600 hover:bg-red-700 w-1/2 p-3 rounded-lg text-lg font-semibold transition"
          >
            Guardar Cambios
          </button>

          <button
            onClick={() => navigate("/gestion-usuarios")}
            className="bg-gray-600 hover:bg-gray-700 w-1/2 p-3 rounded-lg text-lg font-semibold transition"
          >
            Cancelar
          </button>
        </div>

      </div>
    </div>
  );
};

export default DetailPerfilAdmin;
