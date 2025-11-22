import React, { use, useState } from 'react';
import logo from '../../assets/Logo_2.png';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Header2 = ({ setIsModalOpen }) => {
  const { user, logout } = useAuth()
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()

  const toggleMenu = () => setIsOpen(!isOpen)

  const navbarLinks = [
    { id: 1, name: "Inicio", href: "/", icon: "bi bi-house-fill" },
    { id: 2, name: "Catálogo", href: "/", icon: "bi bi-film" },
    { id: 3, name: "Mi Lista", href: "#", icon: "bi bi-bookmark-heart-fill" },
  ];

  const handleLinkClick = (linkName, event) => {
    event.preventDefault()
    if (linkName === "Mi Lista") {
      setIsModalOpen(true);
      setIsOpen(false);
    }
  };

  return (
    <nav className="w-full bg-black/90 text-white relative z-50">
      <div className="flex justify-between items-center sm:px-12 sm:py-3 px-4 py-2">

        {/* LOGO */}
        <div 
        onClick={() => navigate('/')}
        className="flex items-center gap-2">
          <img 
            src={logo} 
            alt="LogoPeliFlix" 
            className="w-[120px] p-0.5"
          />                  
        </div>

        {/* NAVBAR CENTRADO */}
        <div className="hidden md:flex flex-1 justify-center">
          <ul className="flex space-x-6 px-4">
            {navbarLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={link.href}
                  onClick={(e) => handleLinkClick(link.name, e)}
                  className="flex items-center gap-2 text-white hover:text-red-400 transition font-semibold cursor-pointer"
                >
                  <i className={link.icon}></i>
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* NOMBRE + LOGOUT */}
        <div className="hidden md:flex items-center gap-4">

          {user && (
            <span className="text-white font-semibold">
              Hola, {user.name}
            </span>
          )}

          {user && (
            <button
              onClick={logout}
              className="px-4 py-2 bg-red-700 hover:bg-red-300 text-white rounded font-bold cursor-pointer"
            >
              Cerrar Sesión
            </button>
          )}
        </div>

        {/* BOTÓN MOBILE */}
        <button
          className="md:hidden text-white p-2 cursor-pointer z-50"
          onClick={toggleMenu}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* MOBILE MENU */}
      <div
        className={`md:hidden absolute top-[70px] left-0 w-full bg-black/90 transition-all duration-300 z-40 ${
          isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
        }`}
      >
        <ul className="flex flex-col items-center">
          {navbarLinks.map((link) => (
            <li key={link.id} className="py-3 border-b border-gray-700 w-full text-center">
              <a
                href={link.href}
                onClick={(e) => handleLinkClick(link.name, e)}
                className="flex items-center justify-center gap-2 text-white font-semibold hover:text-red-400 transition cursor-pointer"
              >
                <i className={link.icon}></i>
                {link.name}
              </a>
            </li>
          ))}
        </ul>

        {/* NOMBRE + LOGOUT MOBILE */}
        {user && (
          <div className="flex flex-col items-center py-3 border-t border-red-400">
            <span className="text-white font-semibold mb-2">
              {user.name}
            </span>
            <button
              onClick={logout}
              className="px-4 py-2 bg-red-700 hover:bg-red-300 text-white rounded font-bold"
            >
              Cerrar Sesión
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header2;
