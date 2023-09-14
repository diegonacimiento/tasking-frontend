import React from "react";
import { Link } from "react-router-dom";
import FormCreateUser from "./FormCreateUser";
import "./createUser.css";

export default function CreateUser() {
  return (
    <main className="main-create-user">
      <h3>Completa el registro</h3>

      <FormCreateUser />

      <div className="main-create-user__login">
        <h3>¿Ya estás registrado?</h3>
        <Link className="link-login" to={"/login"}>
          Iniciar sesión
        </Link>
      </div>
    </main>
  );
}
