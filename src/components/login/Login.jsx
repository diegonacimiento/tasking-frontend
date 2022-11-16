import "./login.css";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {

  const navigate = useNavigate();

  function create() {
    navigate("/create-user");
  };

  function error() {
    document.getElementById("error").textContent = "EL usuario ya existe"
  };

  return (
    <>
      <Header />

      <main className="main-login">
        <div className="main-login__login">
          <input type={"email"} placeholder="Email" />
          <input type={"password"} placeholder="Contraseña" />
          <button className="button" onClick={error}>Iniciar sesión</button>
          <p id="error"></p>
        </div>

        <Link className="main-login__link-rp" to="/recovery-password">
          ¿Olvidaste tu contraseña?
        </Link>

        <div className="main-login__create-user">
          <h3>¿Aún no tienes un usuario?</h3>
          <button className="button" onClick={create}>
            Crear usuario
          </button>
        </div>
      </main>

      <Footer />
    </>
  );
}
