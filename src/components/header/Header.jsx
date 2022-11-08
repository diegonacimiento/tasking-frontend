import { MdDarkMode, MdLightMode } from "react-icons/md";
import { useContext } from "react";
import { Context } from "../../context/Context";
import "./header.css";

export default function Header() {

    const { mode, changeMode } = useContext(Context);

    if(!mode) localStorage.setItem("mode", "light");

    const style = document.documentElement.style;

    mode == "light" 
      ? (style.setProperty("--image", 'url("https://i.ibb.co/h89BLcF/tasking.png")'),
         style.setProperty("--colorLetra", "rgb(0, 0, 0)"))
      : (style.setProperty("--image", 'url("https://i.ibb.co/3kXpCk5/image.png")'),
         style.setProperty("--colorLetra", "rgb(150, 150, 150)"))

    

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