import { useState } from "react";
import HeaderUser from "../componentes/PageUser/HeaderUser";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import FavoritosModal from "../componentes/PageUser/FavoritosModal"; // default export

const LayoutUser = () => {
  const [openFavModal, setOpenFavModal] = useState(false);

  return (
    <>
      {/* PASAMOS LA FUNCIÓN como prop */}
      <HeaderUser onOpenFavoritos={() => setOpenFavModal(true)} />

      <main>
        <Outlet />
      </main>

      <Footer />

      {/* Modal en el layout para que esté por encima del Outlet */}
      <FavoritosModal
        isOpen={openFavModal}
        onClose={() => setOpenFavModal(false)}
      />
    </>
  );
};

export default LayoutUser;
