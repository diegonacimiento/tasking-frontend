import Header from "../header/Header";
import Footer from "../footer/Footer";
import { Link, useNavigate } from "react-router-dom";
import "./recoveryPassword.css";

export default function RecoveryPassword() {
  const navigate = useNavigate();

  function send() {
    navigate("/create-user");
  };

  function error(e) {
    e.preventDefault();
    document.getElementById("error").textContent = "EL usuario ya existe";
  };

  const style = document.documentElement.style;

  style.setProperty("--heightRoot", "100vh");
  style.setProperty("--minHeightRoot", "620px");

  return (
    <>
      <Header />

      <main className="main-rp">
        <form onSubmit={error}>
          <h2>
            Revisa tu correo y sigue las instrucciones
          </h2>
          <p>
            Te enviaremos un enlace a tu correo para que puedas cambiar la
            contraseña
          </p>
          <input
            placeholder="Email"
            type={"email"}
          />
          <button
            className="button"
          >
            Enviar
          </button>
          <p id="error"></p>
        </form>

        <Link to={"/login"}>Regresar al inicio de sesión</Link>

        <div className="main-rp__login">
            <h3>¿Aún no tienes un usuario?</h3>
            <button onClick={send} className="button">
              Crear un usuario
            </button>
        </div>

      </main>

      <Footer />
    </>
  );
}
