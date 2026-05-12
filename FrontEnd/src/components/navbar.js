import React, { useState, useEffect } from "react";
import "../CSS/navbar.css";
import { AiOutlineUser, AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { FaUsers } from "react-icons/fa"; // Ícono para profesionales
import logo from "../images/logo.png";
import { useNavigate, Link, useLocation } from "react-router-dom";

import Notificaciones from "../components/notificaciones/notificaciones.js";

export const Navbar = () => {
  var usuario = JSON.parse(localStorage.getItem("user"));
  const location = useLocation();
  const [menuAbierto, setMenuAbierto] = useState(false);

  var goToLogin;
  if(usuario !== null ){
    goToLogin = true;
  }else{
    goToLogin = false;
  }

  const navigate = useNavigate();

  useEffect(() => {
    setMenuAbierto(false);
  }, [location.pathname]);

  useEffect(() => {
    if (menuAbierto) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [menuAbierto]);

  const toggleMenu = () => {
    setMenuAbierto(!menuAbierto);
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  const isActive = (path) => {
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname.startsWith(path)) return true;
    return false;
  };

  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="navbar">
        <Link to="/"><img src={logo} className="logo" alt="Logo Komuness" /></Link>

        <button
          className="botonMovil"
          onClick={toggleMenu}
          aria-label={menuAbierto ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={menuAbierto}
        >
          {menuAbierto ? <AiOutlineClose /> : <AiOutlineMenu />}
        </button>

        <nav className={`nav-menu ${menuAbierto ? "menu-abierto" : ""}`}>
          <ul className="menu">
            <li
              onClick={() => handleNavigation("/publicaciones")}
              className={isActive("/publicaciones") ? "activo" : ""}
            >
              <span>Publicaciones</span>
            </li>
            <li
              onClick={() => handleNavigation("/eventos")}
              className={isActive("/eventos") ? "activo" : ""}
            >
              <span>Eventos</span>
            </li>
            <li
              onClick={() => handleNavigation("/emprendimientos")}
              className={isActive("/emprendimientos") ? "activo" : ""}
            >
              <span>Emprendimientos</span>
            </li>
            <li
              onClick={() => handleNavigation("/biblioteca/0")}
              className={isActive("/biblioteca") ? "activo" : ""}
            >
              <span>Biblioteca</span>
            </li>
            <li
              onClick={() => handleNavigation("/calendario")}
              className={isActive("/calendario") ? "activo" : ""}
            >
              <span>Calendario</span>
            </li>
    
            <li
              onClick={() => handleNavigation("/tutoriales")}
              className={isActive("/tutoriales") ? "activo" : ""}
            >
              <span>Tutoriales</span>
            </li>

            {/* ítem para profesionales */}
            <li
              onClick={() => handleNavigation("/profesionales")}
              className={isActive("/profesionales") ? "activo" : ""}
            >
              <FaUsers className="profesionales-icon" />
              <span className="menu-text-movil">Profesionales</span>
            </li>
            <li
              onClick={() => handleNavigation(goToLogin ? "/perfilUsuario" : "/iniciarSesion")}
              className={isActive("/perfilUsuario") || isActive("/iniciarSesion") ? "activo" : ""}
            >
              <AiOutlineUser className="user-icon" />
              <span className="menu-text-movil">{goToLogin ? "Mi Perfil" : "Iniciar Sesión"}</span>
            </li>
            <li
              onClick={() => {setMenuAbierto(false); setOpen(true)}}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="size-6">
                  <path stroke-linecap="round" stroke-linejoin="round" 
                    d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
              </svg>
              <span className="menu-text-movil">
                Notificaciones
              </span>
            </li>
          </ul>
        </nav>
      </header>

      {menuAbierto && (
        <div
          className="menu-overlay"
          onClick={() => setMenuAbierto(false)}
          aria-hidden="true"
        />
      )}
      <div>
        <Notificaciones open={open} setOpen={setOpen}/>
      </div>
    </>
  );
};

export default Navbar;
