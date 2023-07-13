import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { VscClose } from "react-icons/vsc";
import { Context } from "../../context/Context";
import "./drawer.css";

export default function Drawer({ isDrawerOpen, handleDrawer }) {
  const { logout } = useContext(Context);

  const handleLogout = () => {
    handleDrawer();
    logout();
  }

  const style = document.documentElement.style;

  const root = document.getElementById("root");

  isDrawerOpen
    ? (style.setProperty("--left", "0"),
      setTimeout(() => {
        root.setAttribute("style", "display:none");
      }, 500))
    : (style.setProperty("--left", "-2000rem"), root.removeAttribute("style"));

  return (
    <>
      <button onClick={handleDrawer} className="drawer__button-close">
        <VscClose />
      </button>
      <div className="contain-drawer">
        <Link onClick={handleDrawer} className="links-drawer" to={"/"}>
          Tareas
        </Link>
        <Link onClick={handleDrawer} className="links-drawer" to={"/update-user"}>
          Editar usuario
        </Link>
        <button onClick={handleLogout} id="bt-drawer" className="button">
          Cerrar sesión
        </button>
      </div>
    </>
  );
}
