import React, { useRef, useState } from "react";
import { HiOutlineMenu } from "react-icons/hi";
import Drawer from "../drawer/Drawer";
import Menu from "../../../Menu";

const root = document.getElementById("root");
const drawer = document.getElementById("drawer");

export default function HeaderMobile({ logout }) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const navBarDrawer = useRef(null);
  const stuffedDrawer = useRef(null);

  function toggleDrawer() {
    setIsDrawerOpen((prevState) => !prevState);
    !isDrawerOpen
      ? (drawer.setAttribute("style", "width: 100%;"),
        navBarDrawer.current.setAttribute("style", "width: 200px;"),
        stuffedDrawer.current.setAttribute(
          "style",
          "background-color: rgba(0, 0, 0, 0.7);",
        ),
        root.setAttribute("style", "position: fixed;"))
      : (setTimeout(() => {
          drawer.removeAttribute("style");
        }, 500),
        navBarDrawer.current.removeAttribute("style"),
        stuffedDrawer.current.removeAttribute("style"),
        root.removeAttribute("style"));
  }
  return (
    <>
      <Menu>
        <Drawer
          toggleDrawer={toggleDrawer}
          logout={logout}
          refs={{ navBarDrawer, stuffedDrawer }}
        />{" "}
      </Menu>
      <button
        onClick={toggleDrawer}
        className="drawer"
        title="Abrir cajón"
        type="button"
      >
        {<HiOutlineMenu />}
      </button>
    </>
  );
}
