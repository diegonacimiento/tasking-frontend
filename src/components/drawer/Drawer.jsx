import React from "react";
import { HiOutlineMenu } from "react-icons/hi";
import NavBar from "../navBar/NavBar";
import "./drawer.css";

export default function Drawer({ toggleDrawer, logout, refs }) {
  const { navBarDrawer, stuffedDrawer } = refs;
  return (
    <>
      <button title="Cerrar cajón" onClick={toggleDrawer} className="drawer__button-close" type="button">
        <HiOutlineMenu />
      </button>
      <div className="contain-nav-bar" ref={navBarDrawer}>
        <NavBar logout={logout} toggleDrawer={toggleDrawer} />
      </div>
      <div className="stuffed-drawer" ref={stuffedDrawer} onClick={toggleDrawer}></div>
    </>
  );
}
