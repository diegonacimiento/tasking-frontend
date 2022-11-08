import "./login.css";
import Header from "../header/Header";

export default function Login() {

    const mode = localStorage.getItem("mode");

    if(mode == "dark") {
      const style = document.documentElement.style;
      //style.setProperty("--colorRoot", "");
    } else {
        
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
