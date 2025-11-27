import { useState } from "react";
import HeaderAdmin from "./PagesAdmin/HeaderAdmin";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import FavoritosModal from "../componentes/PageUser/FavoritosModal"; // default export

const LayoutAdmin = () => {
  const [openFavModal, setOpenFavModal] = useState(false);

  return (
    <div className="w-full min-h-screen flex flex-col bg-black/60"> 
      {/* HEADER FULL WIDTH */}
      <HeaderAdmin onOpenFavoritos={() => setOpenFavModal(true)} />

      {/* MAIN FULL WIDTH */}
      <main className="flex-1 w-full">
        <Outlet />
      </main>

      {/* FOOTER FULL WIDTH */}
      <Footer />

      {/* Modal */}
      <FavoritosModal
        isOpen={openFavModal}
        onClose={() => setOpenFavModal(false)}
      />
    </div>
  );
};

export default LayoutAdmin;
