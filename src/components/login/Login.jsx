import React from "react";
import { Link, useNavigate } from "react-router-dom";
import FormLogin from "./FormLogin";
import "./login.css";

export default function Login() {
  const navigate = useNavigate();

  function handleCreateUser() {
    navigate("/create-user");
  }

  return (
    <main className="main-login">
      <FormLogin navigate={navigate} />

      <Link className="main-login__link-rp" to="/recovery-password">
        ¿Olvidaste tu contraseña?
      </Link>

      <div className="main-login__create-user">
        <h3>¿Aún no tienes un usuario?</h3>
        <button
          title="Crear usuario"
          className="button"
          onClick={handleCreateUser}
        >
          Crear usuario
        </button>
      </div>
    </main>
  );
}
