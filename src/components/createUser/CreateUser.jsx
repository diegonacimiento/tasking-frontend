import Header from "../header/Header";
import Footer from "../footer/Footer";
import { Link } from "react-router-dom";
import "./createUser.css";

export default function CreateUser() {
  function send(e) {
    e.preventDefault();
  }

  function error() {
    document.getElementById("error").textContent = "EL usuario ya existe"
  };


  return (
    <>
      <Header />

      <div id="contain-create">
        <h3>Completa el registro</h3>
        <form onClick={send} id="form-create">
          <label>
            <span>Usuario</span>
            <input type={"text"} />
          </label>
          <label>
            <span>Correo electrónico</span>
            <input type={"email"} />
          </label>
          <label>
            <span>Contraseña</span>
            <input type={"password"} />
          </label>
          <label>
            <span>Confirmar contraseña</span>
            <input type={"password"} />
          </label>
          <label id="label-button">
            <button
            onClick={error} className="button">Crear</button>
          </label>
        </form>
        <p id="error"></p>
      </div>
      <div id="login-create">
        <span>¿Ya estás registrado?</span>
        <Link id="link-login" to={"/login"}>
          Iniciar sesión
        </Link>
      </div>
      <Footer />
    </>
  );
}
