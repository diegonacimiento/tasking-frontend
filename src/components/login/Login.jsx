import "./login.css";
import Header from "../header/Header";
import { useContext } from "react";
import { Context } from "../../context/Context";

export default function Login() {

  const { mode } = useContext(Context);

    const style = document.documentElement.style;

    if(mode == "dark") {
      style.setProperty("--colorRoot", "rgb(34, 34, 34)");
      style.setProperty("--colorBorder", "rgb(104, 104, 104)");
      style.setProperty("--colorBotton", "rgb(255, 255, 255)");
    } else {
      style.setProperty("--colorRoot", "rgb(230, 230, 230)");
      style.setProperty("--colorBorder", "rgb(104, 104, 104)");
      style.setProperty("--colorBotton", "rgb(0, 0, 0)");
    };

  return (
    <>
      <Header />

      <div id="contain-login">
        <div id="login">
          <input type={"email"} placeholder="Email" />
          <input type={"password"} placeholder="Contraseña" />
          <button className="button">Iniciar sesión</button>
          <span id="error"></span>
        </div>

        <a id="recovery-password" href="">
          ¿Olvidaste tu contraseña?
        </a>

        <div id="create-user">
          <h3>¿Aún no tienes un usuario?</h3>
          <button className="button">Crear usuario</button>
        </div>
      </div>
    </>
  );
}
