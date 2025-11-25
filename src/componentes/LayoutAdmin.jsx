import { useState } from "react";
import HeaderAdmin from "./PagesAdmin/HeaderAdmin";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import FavoritosModal from "../componentes/PageUser/FavoritosModal"; // default export

const LayoutAdmin = () => {
  const [openFavModal, setOpenFavModal] = useState(false);

  return (
    <>
      {/* PASAMOS LA FUNCIÓN como prop */}
      <HeaderAdmin onOpenFavoritos={() => setOpenFavModal(true)} />

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

export default LayoutAdmin;