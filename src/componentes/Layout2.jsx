import { useState } from "react";
import Header2 from "../componentes/PageUser/Header2";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import FavoritosModal from "../componentes/PageUser/FavoritosModal"; // default export

const Layout2 = () => {
  const [openFavModal, setOpenFavModal] = useState(false);

  return (
    <>
      {/* PASAMOS LA FUNCIÓN como prop */}
      <Header2 onOpenFavoritos={() => setOpenFavModal(true)} />

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

export default Layout2;
