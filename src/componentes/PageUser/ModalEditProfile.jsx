import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { useAuth } from "../../contexts/AuthContext";

import doug from "../../assets/avatars/Doug.jpg";
import starwars from "../../assets/avatars/starwars.jpeg";
import starwars2 from "../../assets/avatars/starwars2.webp";
import starwars3 from "../../assets/avatars/starwars3.webp";

const avatars = [doug, starwars, starwars2, starwars3];

const ModalEditProfile = ({ isOpen, onClose, profile }) => {
  const { user, updateUserProfile } = useAuth();

  const [name, setName] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState("");

  // Cargar datos del perfil (deferred to avoid synchronous setState in effect)
  useEffect(() => {
    if (!profile) return;

    // Defer updates so setState does not run synchronously inside the effect,
    // avoiding cascading renders warnings.
    const t = setTimeout(() => {
      setName(profile.name);
      setSelectedAvatar(profile.avatar);
    }, 0);

    return () => clearTimeout(t);
  }, [profile]);

  if (!isOpen) return null;

  // GUARDAR CAMBIOS
  const handleSave = async () => {
    // ❗ VALIDAR NOMBRE REPETIDO
    const nombreExiste = user.perfiles.some(
      (p) =>
        p.name.toLowerCase() === name.trim().toLowerCase() &&
        p.id !== profile.id // permite el nombre original
    );

    if (nombreExiste) {
      await Swal.fire({
        title: "Nombre repetido",
        text: `Ya existe un perfil llamado "${name}".`,
        icon: "error",
        confirmButtonText: "Entendido",
      });
      return;
    }

    const confirm = await Swal.fire({
      title: "¿Guardar cambios del perfil?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Guardar",
      cancelButtonText: "Cancelar",
    });

    if (confirm.isDismissed) {
      toast.info("Edición cancelada");
      return;
    }

    // Guardar en BD
    await updateUserProfile(profile.id, {
      name,
      avatar: selectedAvatar,
    });

    toast.success("Perfil actualizado");
    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-neutral-900 p-6 rounded-xl shadow-xl w-[90%] max-w-md text-white relative animate-fadeIn"
        onClick={(e) => e.stopPropagation()}
      >
        {/* BOTÓN CERRAR */}
        <button
          className="absolute right-4 top-4 text-gray-300 hover:text-red-500 text-xl"
          onClick={onClose}
        >
          ✖
        </button>

        <h2 className="text-2xl font-bold mb-4 text-center">Editar Perfil</h2>

        {/* INPUT NOMBRE */}
        <input
          type="text"
          value={name}
          placeholder="Nombre del perfil"
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 rounded bg-neutral-700 mb-4"
        />

        {/* AVATARES */}
        <div className="grid grid-cols-4 gap-4 mb-4">
          {avatars.map((avatar, i) => (
            <img
              key={i}
              src={avatar}
              onClick={() => setSelectedAvatar(avatar)}
              className={`w-16 h-16 rounded-full cursor-pointer border-4 transition 
                ${
                  selectedAvatar === avatar
                    ? "border-red-500 scale-105"
                    : "border-transparent"
                }
              `}
            />
          ))}
        </div>

        {/* BOTONES */}
        <div className="flex mt-4 justify-center ">
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded mr-4"
          >
            Guardar
          </button>

          <button
            onClick={onClose}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalEditProfile;
