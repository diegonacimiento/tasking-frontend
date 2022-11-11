import { MdDarkMode, MdLightMode } from "react-icons/md";
import { useContext } from "react";
import { Context } from "../../context/Context";
import { HiOutlineMenu } from "react-icons/hi";
import MenuBar from "../menuBar/MenuBar";
import Menu from "../../../Menu";
import "./header.css";

export default function Header({ ban }) {
  const { mode, changeMode, menuNone, stateMenu } = useContext(Context);

  if (!mode) localStorage.setItem("mode", "light");

  const style = document.documentElement.style;

  mode == "light"
    ? (style.setProperty(
        "--image",
        'url("https://i.ibb.co/h89BLcF/tasking.png")'
      ),
      style.setProperty("--colorLetra", "rgb(0, 0, 0)"))
    : (style.setProperty(
        "--image",
        'url("https://i.ibb.co/3kXpCk5/image.png")'
      ),
      style.setProperty("--colorLetra", "rgb(150, 150, 150)"));

  stateMenu == "false"
    ? (style.setProperty("--left", "0"))
    : (style.setProperty("--left", "-2000rem"));

  return (
    <>
      {ban ? (
        <Menu>
          <MenuBar />{" "}
        </Menu>
      ) : (
        (ban = false)
      )}

      <div id="header">
        {ban ? (
          <button onClick={menuNone} id="menu">
            {<HiOutlineMenu />}
          </button>
        ) : (
          (ban = false)
        )}

        <div id="contain-logo">
          <span id="logo">
            {mode == "light" 
            ? <img src="https://i.ibb.co/h89BLcF/tasking.png" />
            : <img src="https://i.ibb.co/3kXpCk5/image.png" />
            }
          </span>
          <span id="letra">Tasking</span>
        </div>

        <button id="mode" onClick={changeMode}>
          {mode == "dark" ? <MdDarkMode /> : <MdLightMode />}
        </button>
      </div>
    </>
  );
}
