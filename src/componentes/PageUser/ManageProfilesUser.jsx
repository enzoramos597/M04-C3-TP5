import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import ModalEditProfile from "./ModalEditProfile";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import axios from "axios";
import { API_USERS } from "../../services/api";
import { useNavigate } from "react-router-dom";

const ManageProfilesUser = () => {
  const { user, refreshUser } = useAuth();
  const [modalOpen, setModalOpen] = useState(false);
  const [profileToEdit, setProfileToEdit] = useState(null);

  const navigate = useNavigate();

  // 🗑 ELIMINAR PERFIL
  const handleDelete = async (profileId) => {
     const perfil = user.perfiles.find((p) => p.id === profileId);
    Swal.fire({
      text: `¿Eliminar el perfil "${perfil.name}"`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
      background: "#1f1f1f",
      color: "white",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const nuevosPerfiles = user.perfiles.filter((p) => p.id !== profileId);

          await axios.put(`${API_USERS}/${user.id}`, {
            ...user,
            perfiles: nuevosPerfiles,
          });

          await refreshUser(user.id);

          // ✔ Swal success
          Swal.fire({
            title: "Perfil eliminado Exitosamente",
            icon: "success",
            timer: 1000,
            showConfirmButton: false,
            background: "#1f1f1f",
            color: "white",
          });

          // 🔵 SI YA NO QUEDAN PERFILES → volver
          if (nuevosPerfiles.length === 0) {
            navigate("/profileselector");
          }

          toast.success("Perfil eliminado correctamente");
        } catch (error) {
          toast.error("Error eliminando el perfil");
          console.error(error);
        }
      } else {
        // 🔴 Cancelado
        toast.info("Eliminación cancelada");
      }
    });
  };

  return (
    <div className="min-h-screen bg-black/90 text-white flex flex-col items-center pt-20 pb-10">

      <h1 className="text-4xl font-bold mb-10">Administrar Perfiles</h1>

      {/* 🔙 BOTÓN VOLVER */}
      <button
        onClick={() => navigate("/profileselector")}
        className="mb-10 bg-gray-700 hover:bg-gray-600 px-6 py-2 rounded-lg"
      >
        Volver a Perfiles
      </button>

      <div
        className="
          grid 
          gap-10 
          sm:grid-cols-2 
          md:grid-cols-3 
          lg:grid-cols-4 
          xl:grid-cols-5 
          place-items-center
        "
      >
        {user?.perfiles?.map((p) => (
          <div key={p.id} className="flex flex-col items-center text-center">

            <img
              src={p.avatar}
              className="w-28 h-28 rounded-lg cursor-pointer object-cover mb-3 
              shadow-xl hover:scale-105 transition"
            />

            <p className="text-lg font-semibold mb-3">{p.name}</p>

            <div className="flex gap-3">

              {/* BOTÓN EDITAR */}
              <button
                className="bg-blue-600 hover:bg-blue-700 px-4 py-1 rounded"
                onClick={() => {
                  setProfileToEdit(p);
                  setModalOpen(true);
                }}
              >
                Editar
              </button>

              {/* BOTÓN ELIMINAR */}
              <button
                className="bg-red-600 hover:bg-red-700 px-4 py-1 rounded"
                onClick={() => handleDelete(p.id)}
              >
                Eliminar
              </button>

            </div>
          </div>
        ))}
      </div>

      {/* MODAL EDITAR */}
      <ModalEditProfile
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        profile={profileToEdit}
      />
    </div>
  );
};

export default ManageProfilesUser;
