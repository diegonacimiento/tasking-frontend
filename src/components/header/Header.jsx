import { MdDarkMode, MdLightMode } from "react-icons/md";
import { useContext } from "react";
import { Context } from "../../context/Context";
import { HiOutlineMenu } from "react-icons/hi";
import MenuBar from "../menuBar/MenuBar";
import Menu from "../../../Menu";
import "./header.css";
import { useNavigate } from "react-router-dom";

export default function Header({ ban }) {
  const { mode, changeMode, menuNone, stateMenu } = useContext(Context);

  const navigate = useNavigate();

  const style = document.documentElement.style;

  mode == "light"
    ? (style.setProperty(
        "--image",
        'url("https://i.ibb.co/h89BLcF/tasking.png")'
      ),
      style.setProperty("--colorLetra", "rgb(0, 0, 0)"))
    : (style.setProperty(
        "--image",
        'url("https://i.ibb.co/kQZ260V/tasking-Blanco.png")'
      ),
      style.setProperty("--colorLetra", "rgb(150, 150, 150)"));

  stateMenu == "false"
    ? (style.setProperty("--left", "0"))
    : (style.setProperty("--left", "-2000rem"));

  return (
    <header>
      {ban ? (
        <Menu>
          <MenuBar />{" "}
        </Menu>
      ) : (
        (ban = false)
      )}

        {ban ? (
          <button onClick={menuNone} className="menu">
            {<HiOutlineMenu />}
          </button>
        ) : (
          (ban = false)
        )}

        <div onClick={() => navigate("/")} className="logo-contain">
          <span className="image"></span>
          <p className="letra">Tasking</p>
        </div>

        <button className="mode" onClick={changeMode}>
          {mode == "dark" ? <MdDarkMode /> : <MdLightMode />}
        </button>
    </header>
  );
}
