import Header from "../header/Header";
import { Link, useNavigate } from "react-router-dom";
import "./recoveryPassword.css";

export default function RecoveryPassword() {

    const navigate = useNavigate();

    function send() {
        navigate("/create-user");
    };

    function error() {
        document.getElementById("error").textContent = "EL usuario ya existe"
    };

  return (
    <>
      <Header />

      <div id="contain-recovery">
        <div id="form">
          <h2 className="item-recovery-form">
            Revisa tu correo y sigue las instrucciones
          </h2>
          <p className="item-recovery-form">
            Te enviaremos un enlace a tu correo para que puedas cambiar la
            contraseña
          </p>
          <input className="item-recovery-form" placeholder="Email" type={"email"} />
          <button className="item-recovery-form" onClick={error} className="button">Enviar</button>
          <p className="item-recovery-form" id="error"></p>
        </div>
      </div>

      <div id="login-create">
        <Link to={"/login"}>Regresar al inicio de sesión</Link>
        <div id="login-recovery">
          <h3>¿Aún no tienes un usuario?</h3>
          <button onClick={send} className="button">Crear un usuario</button>
        </div>
      </div>
    </>
  );
}
