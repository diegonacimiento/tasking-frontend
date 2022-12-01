import Header from "../header/Header";
import Footer from "../footer/Footer";
import { Link, useNavigate } from "react-router-dom";
import "./recoveryPassword.css";
import { useContext } from "react";
import { Context } from "../../context/Context";
import usersService from "../../services/user.service";

const service = new usersService();

export default function RecoveryPassword() {
  const navigate = useNavigate();

  const { emailValidation } = useContext(Context);

  function createUser() {
    navigate("/tasking-frontend/create-user");
  };

  function send() {
    const email = document.querySelector(".email");
    if(email.value.length == 0) return error("Por favor ingrese su email.");
    const mailValidation = emailValidation();
    if(mailValidation == "invalido") return error("Mail inválido");
    const mailSend = service.recoveryPassword({email: `${email.value}`});
    mailSend.then(() => {
      document.getElementById("error").setAttribute("style", "color: green");
      document.getElementById("error").textContent = `Mail enviado con éxito`;
    })
    .catch((e) => {
      if(e.response.status == 404) error("El mail no está vinculado.")
      else error("Ha ocurrido un error, intente de nuevo.");
    });
  };

  function error(msg) {
    document.getElementById("error").setAttribute("style", "color: rgb(238, 16, 16)");
    document.getElementById("error").textContent = `${msg}`;

  };

  function form(e) {
    e.preventDefault();
  };

  const style = document.documentElement.style;

  style.setProperty("--heightRoot", "100vh");
  style.setProperty("--minHeightRoot", "620px");

  return (
    <>
      <Header />

      <main className="main-rp">
        <form onSubmit={form}>
          <h2>
            Revisa tu correo y sigue las instrucciones
          </h2>
          <p>
            Te enviaremos un enlace a tu correo para que puedas cambiar la
            contraseña
          </p>
          <input
            className="email"
            placeholder="Email"
            type={"email"}
          />
          <button
            onClick={send}
            className="button"
          >
            Enviar
          </button>
          <p id="error"></p>
        </form>

        <Link to={"/tasking-frontend/login"}>Regresar al inicio de sesión</Link>

        <div className="main-rp__login">
            <h3>¿Aún no tienes un usuario?</h3>
            <button onClick={createUser} className="button">
              Crear un usuario
            </button>
        </div>

      </main>

      <Footer />
    </>
  );
}
