import { MdDarkMode, MdLightMode } from "react-icons/md";
import { useState } from "react";
import "./header.css";

export default function Header() {

    const [mode, setMode] = useState(localStorage.getItem("mode"));


    if(!mode) localStorage.setItem("mode", "light");

    function changeMode() {
        mode == "light" 
            ? (localStorage.setItem("mode", "dark"), setMode("dark")) 
            : (localStorage.setItem("mode", "light"), setMode("light"))
    };

  return (
    <div id="header">

      <div id="contain-logo">
        <span id="logo"></span>
        <span id="letra">Tasking</span>
      </div>

      <button id="mode" onClick={changeMode} >
        {mode == "dark" ? <MdDarkMode /> : <MdLightMode />}
      </button>

    </div>
  );
}