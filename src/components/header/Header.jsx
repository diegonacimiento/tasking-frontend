import React from "react";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { useContext, useState } from "react";
import { Context } from "../../context/Context";
import "./header.css";
import HeaderMobile from "./HeaderMobile";
import HeaderDesktop from "./HeaderDesktop";

const isMobile = window.innerWidth <= 712 || window.innerHeight <= 575; 

export default function Header() {
  const { mode, changeMode, menuNone, stateMenu, token, logout } = useContext(Context);

  const [isMobileScreen, setIsMobileScreen] = useState(isMobile);

  addEventListener('resize', () => {
    const changeScreen = window.innerWidth <= 712 || window.innerHeight <= 575; 
    setIsMobileScreen(changeScreen);
  })

  const style = document.documentElement.style;

  const root = document.getElementById("root");

  mode == "dark"
    ? (style.setProperty(
      "--image",
      'url("https://i.ibb.co/kQZ260V/tasking-Blanco.png")'
    ),
      style.setProperty("--colorLetra", "rgb(0, 0, 0)"))
    : (style.setProperty(
      "--image",
      'url("https://i.ibb.co/h89BLcF/tasking.png")'
    ),
      style.setProperty("--colorLetra", "rgb(150, 150, 150)"));

  stateMenu == "false"
    ? (style.setProperty("--left", "0"),
      setTimeout(() => {
        root.setAttribute("style", "display:none");
      }, 500))
    : (style.setProperty("--left", "-2000rem"), root.removeAttribute("style"));

  return (
    <header>
      {(token && isMobileScreen) && (
        <HeaderMobile menuNone={menuNone} />
      )
      }

      <div onClick={() => window.location = "/"} className="logo-contain">
        <span className="image"></span>
        <p className="letra">Tasking</p>
      </div>

      {(token && !isMobileScreen) && (
        <HeaderDesktop logout={logout} />
      )}

      <button className="mode" onClick={changeMode}>
        {mode == "dark" ? <MdDarkMode /> : <MdLightMode />}
      </button>
    </header>
  );
}
