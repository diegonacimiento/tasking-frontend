import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import FormRecoveryPassword from './FormRecoveryPassword';
import "./recoveryPassword.css";

export default function RecoveryPassword() {

  const navigate = useNavigate();

  function handleCreateUser() {
    navigate("/create-user");
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

      <FormRecoveryPassword navigate={navigate} />

      <Link className="back-login" to={"/login"}>Regresar al inicio de sesión</Link>

      <div className="main-rp__login">
        <h3>¿Aún no tienes un usuario?</h3>
        <button onClick={handleCreateUser} className="button" title='Ir a crear usuario'>
          Crear un usuario
        </button>
      </div>

    </main>
  );
}
