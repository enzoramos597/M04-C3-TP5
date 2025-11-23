import { createContext, useContext, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const API = "https://69153a6384e8bd126af9262c.mockapi.io/users";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  const [loading, setLoading] = useState(false);

  // 🔵 LOGIN
  const login = async (email, password) => {
    setLoading(true);
    try {
      const res = await axios.get(API);
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

  // 🔁 🔥 REFRESH USER (después de crear perfil o editar datos)
  const refreshUser = async (id) => {
    try {
      const { data } = await axios.get(`${API}/${id}`);
      setUser(data);
      localStorage.setItem("user", JSON.stringify(data)); // ⬅️ actualizar localStorage
      return data;
    } catch (error) {
      console.error("Error en refreshUser:", error);
    }
  };

  // 🔴 LOGOUT
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  }

  const updateUserFavoritos = async (favoritos) => {
  if (!user) return

  try {
    const updated = { ...user, favoritos }

    await axios.put(`${API}/${user.id}`, updated)

    setUser(updated);
    localStorage.setItem("user", JSON.stringify(updated));
  } catch (error) {
    console.error("Error actualizando favoritos:", error);
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
        updateUserFavoritos   // ⬅️ agregado al contexto
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
