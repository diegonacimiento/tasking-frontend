import Header from "../header/Header";
import Footer from "../footer/Footer";
import { Link } from "react-router-dom";
import "./createUser.css";

export default function CreateUser() {
  function send(e) {
    e.preventDefault();
  }

  function error() {
    document.getElementById("error").textContent = "EL usuario ya existe";
  }

  return (
    <>
      <Header />

      <main className="main-create-user">


        <form onClick={send}>
        <h3>Completa el registro</h3>

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
            <button onClick={error} className="button">
              Crear
            </button>
          </label>

          <p id="error"></p>

        </form>


        <div className="main-create-user__login">
          <h3>¿Ya estás registrado?</h3>
          <Link className="link-login" to={"/login"}>
            Iniciar sesión
          </Link>
        </div>
      </main>

      <Footer />
    </>
  );
}
