import React from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../../context/Context";
import "./menuBar.css";
import { VscClose } from "react-icons/vsc";

export default function MenuBar() {
  const { logout, menuNone } = useContext(Context);

  const handleLogout = () => {
    menuNone();
    logout();
  }

  return (
    <>
      <button onClick={menuNone} className="menu-bar__button">
        <VscClose />
      </button>
      <div className="contain-menu">
        <Link onClick={menuNone} className="links-menu" to={"/"}>
          Tareas
        </Link>
        <Link onClick={menuNone} className="links-menu" to={"/update-user"}>
          Editar usuario
        </Link>
        <button onClick={handleLogout} id="bt-menu" className="button">
          Cerrar sesión
        </button>
      </div>
    </>
  );
}
