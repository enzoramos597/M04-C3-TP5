import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";


const Layout = () => {
  return (
    <>
      <Header />
      {/* 🔥 Solo el contenido dinámico va aquí */}
      <main className=" px-4 bg-black/60">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;

