import React, { useState, useEffect } from "react";
import "../CSS/navbar.css";
import { AiOutlineUser, AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { FaUsers } from "react-icons/fa"; // Ícono para profesionales
import logo from "../images/logo.png";
import { useNavigate, Link, useLocation } from "react-router-dom";

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
    </>
  );
};

export default Navbar;