import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Main from "./Main";
import { Outlet } from "react-router-dom";


const Layout = () => {
  return (
    <>
      <Header />

      {/* 🔥 Solo el contenido dinámico va aquí */}
      <main className=" px-4 ">
        <Outlet />
      </main>

      <Footer />
    </>
  );
};

export default Layout;

