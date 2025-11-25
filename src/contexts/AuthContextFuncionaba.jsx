import { createContext, useContext, useState } from "react";
import axios from "axios";
import { API_USERS } from "../services/api";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {

  // 🟦 USER GUARDADO EN LOCALSTORAGE
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  const [loading, setLoading] = useState(false);

  // 🟩 LOGIN
  const login = async (email, password) => {
    setLoading(true);
    try {
      const res = await axios.get(API_USERS);
      const foundUser = res.data.find(
        (u) => u.correo === email && u.contrasenia === password
      );

      if (!foundUser) return null;

      setUser(foundUser);
      localStorage.setItem("user", JSON.stringify(foundUser));

      return foundUser;
    } catch (error) {
      console.error("Error en login:", error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // 🟧 REFRESCAR DATOS DEL USER
  const refreshUser = async (id) => {
    try {
      const { data } = await axios.get(`${API_USERS}/${id}`);
      setUser(data);
      localStorage.setItem("user", JSON.stringify(data));
      return data;
    } catch (error) {
      console.error("Error en refreshUser:", error);
    }
  };

  // 🔴 LOGOUT
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  // ⭐ FAVORITOS DEL USER
  const updateUserFavoritos = async (favoritos) => {
    if (!user) return;

    try {
      const updated = { ...user, favoritos };
      await axios.put(`${API_USERS}/${user.id}`, updated);

      setUser(updated);
      localStorage.setItem("user", JSON.stringify(updated));
    } catch (error) {
      console.error("Error actualizando favoritos:", error);
    }
  };

  const updateUserProfile = async (profileId, updatedData) => {
  if (!user) return;

  try {
    const updatedProfiles = user.perfiles.map((p) =>
      p.id === profileId ? { ...p, ...updatedData } : p
    );

    const updatedUser = { ...user, perfiles: updatedProfiles };

    await axios.put(`${API_USERS}/${user.id}`, updatedUser);

    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));

  } catch (error) {
    console.error("Error actualizando perfil:", error);
  }
}

const deleteUserProfile = async (profileId) => {
  if (!user) return;

  try {
    const updatedProfiles = user.perfiles.filter((p) => p.id !== profileId);

    const updatedUser = { ...user, perfiles: updatedProfiles };

    await axios.put(`${API_USERS}/${user.id}`, updatedUser);

    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));

  } catch (error) {
    console.error("Error eliminando perfil:", error);
  }
};


  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        loading,
        refreshUser,
        updateUserFavoritos,
        updateUserProfile,
        deleteUserProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
