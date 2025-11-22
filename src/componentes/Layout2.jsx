import  { useState } from "react";
import Header2 from "../componentes/PageUser/Header2";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

const Layout2 = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Header2 isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
      <main className="pt-4">
        <Outlet />   {/* Aquí se cargan las rutas dinámicas */}
      </main>
      <Footer />
    </>
  );
}

export default Layout2;
