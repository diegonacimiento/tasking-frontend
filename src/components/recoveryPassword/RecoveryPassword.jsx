import React, { useContext, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../context/Context";
import usersService from "../../services/user.service";
import Loading from "../loading/Loading";
import "./recoveryPassword.css";

const service = new usersService();

export default function RecoveryPassword() {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const { emailValidation } = useContext(Context);

  function createUser() {
    navigate("/create-user");
  }

  function send() {
    const email = document.querySelector(".email");
    if (email.value.length == 0) return error("Por favor ingrese su email.");
    const mailValidation = emailValidation();
    if (mailValidation == "invalido") return error("Email inválido");
    setLoading(true);
    const mailSend = service.recoveryPassword({ email: `${email.value}` });
    mailSend.then(() => {
      document.getElementById("error").setAttribute("style", "color: green");
      document.getElementById("error").textContent = `Email enviado con éxito`;
    })
      .catch((e) => {
        if (e.response.status == 404) error("El email no está vinculado.")
        else {
          error("Ha ocurrido un error.")
          return navigate("/serverError");
        }
      })
      .finally(() => setLoading(false));
  }

  function error(msg) {
    document.getElementById("error").setAttribute("style", "color: rgb(238, 16, 16)");
    document.getElementById("error").textContent = `${msg}`;

  }

  function form(e) {
    e.preventDefault();
  }

  return (
    <main className="main-rp">
      <h2>
        Revisa tu correo y sigue las instrucciones
      </h2>
      <p>
        Te enviaremos un enlace a tu correo para que puedas cambiar la
        contraseña
      </p>
      <form onSubmit={form}>
        <input
          className="email"
          placeholder="Email"
          type={"email"}
        />
        <button
          onClick={send}
          className="button"
        >
          {loading ? <Loading /> : "Enviar"}
        </button>
        <p id="error" className="e-mail"></p>
      </form>

      <Link className="back-login" to={"/login"}>Regresar al inicio de sesión</Link>

      <div className="main-rp__login">
        <h3>¿Aún no tienes un usuario?</h3>
        <button onClick={createUser} className="button">
          Crear un usuario
        </button>
      </div>

    </main>
  );
}
