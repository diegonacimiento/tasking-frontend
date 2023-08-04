import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { Context } from "../../context/Context";
import HeaderDesktop from "./HeaderDesktop";
import HeaderMobile from "./HeaderMobile";
import toggleTheme from "../../assets/theme";
import "./header.css";

const isMobile = window.innerWidth <= 712 || window.innerHeight <= 575;

const isDarkModeParse = JSON.parse(localStorage.getItem("isDarkMode"));

export default function Header() {
  const navigate = useNavigate();

  const { token, setToken } = useContext(Context);

  const [isDarkMode, setIsDarkMode] = useState(isDarkModeParse);
  const [isMobileScreen, setIsMobileScreen] = useState(isMobile);

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    navigate("/login");
  }

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

  addEventListener('resize', () => {
    const newIsMobileScreen = window.innerWidth <= 712 || window.innerHeight <= 575; 
    setIsMobileScreen(newIsMobileScreen);
  })

  return (
    <header>
      {(token && isMobileScreen) && (
        <HeaderMobile logout={logout} />
      )
      }

      <div onClick={() => window.location = "/"} className="logo-contain">
        <span className="image"></span>
        <p className="letra">Tasking</p>
      </div>

      {(token && !isMobileScreen) && (
        <HeaderDesktop logout={logout} />
      )}

      <button title="Cambiar tema" className="mode" onClick={changeMode} type="button">
        {isDarkMode ? <MdDarkMode /> : <MdLightMode />}
      </button>
    </header>
  );
}
