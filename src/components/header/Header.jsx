import React, { useEffect } from "react";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { useContext, useState } from "react";
import { Context } from "../../context/Context";
import "./header.css";
import HeaderMobile from "./HeaderMobile";
import HeaderDesktop from "./HeaderDesktop";
import toggleTheme from "../../assets/theme";

const isMobile = window.innerWidth <= 712 || window.innerHeight <= 575;

const isDarkModeParse = JSON.parse(localStorage.getItem("isDarkMode"));

export default function Header() {
  const { token, logout } = useContext(Context);

  const [isDarkMode, setIsDarkMode] = useState(isDarkModeParse);

  useEffect(() => {
    toggleTheme(isDarkMode);
  }, [])

  function changeMode() {
    isDarkMode
      ? (localStorage.setItem("isDarkMode", "false"),
        setIsDarkMode(false),
        toggleTheme(false))
      : (localStorage.setItem("isDarkMode", "true"),
        setIsDarkMode(true),
        toggleTheme(true));
  }

  const [isMobileScreen, setIsMobileScreen] = useState(isMobile);

  addEventListener('resize', () => {
    const newIsMobileScreen = window.innerWidth <= 712 || window.innerHeight <= 575; 
    setIsMobileScreen(newIsMobileScreen);
  })

  return (
    <header>
      {(token && isMobileScreen) && (
        <HeaderMobile />
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
        {isDarkMode ? <MdDarkMode /> : <MdLightMode />}
      </button>
    </header>
  );
}
