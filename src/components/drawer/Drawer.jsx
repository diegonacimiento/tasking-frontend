import React from "react";
import { VscClose } from "react-icons/vsc";
import NavBar from "../navBar/NavBar";
import "./drawer.css";

export default function Drawer({ toggleDrawer, logout }) {
  return (
    <>
      <button title="Cerrar" onClick={toggleDrawer} className="drawer__button-close" type="button">
        <VscClose />
      </button>
      <div className="contain-nav-bar">
        <NavBar logout={logout} toggleDrawer={toggleDrawer} />
      </div>
    </>
  );
}
