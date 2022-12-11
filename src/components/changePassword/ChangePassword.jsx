import React from "react";
import "./changePassword.css";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import { useContext } from "react";
import { Context } from "../../context/Context";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import usersService from "../../services/user.service";
import { useNavigate } from "react-router-dom";

const service = new usersService();

export default function ChangePassword() {
  const {
    modeViewNP,
    modeViewCNP,
    passwordValidation,
    viewPasswordNP,
    viewPasswordCNP,
  } = useContext(Context);

  const navigate = useNavigate();

  function error(e) {
    document.getElementById("error").textContent = e;
    const newPassword = document.querySelector(".newPassword");
    const confirmNewPassword = document.querySelector(".confirmNewPassword");
    newPassword.setAttribute("style", "border: 1px solid rgb(238, 16, 16)");
    confirmNewPassword.setAttribute(
      "style",
      "border: 1px solid rgb(238, 16, 16)"
    );
  }

  function send() {
    const newPassword = document.querySelector(".newPassword").value;
    const confirmNewPassword = document.querySelector(
      ".confirmNewPassword"
    ).value;

    if (!newPassword && !confirmNewPassword)
      return error("Los campos no pueden quedar vacíos.");

    if (newPassword !== confirmNewPassword) return;

    const uri = window.location.href;

    const index = uri.indexOf("ey");

    const recoveryToken = uri.substring(index, uri.length);

    const body = {
      recoveryToken,
      newPassword,
    };

    const changePass = service.recoveryChangePassword(body);

    changePass
      .then(() => {
        document.getElementById("error").setAttribute("style", "color: green");
        document.getElementById("error").textContent =
          "Cambio de contraseña exitoso.";
        navigate("/");
      })
      .catch(() => error("Ha ocurrido un error, envíe nuevamente el email."));
  }

  return (
    <>
      <Header />

      <main className="main-change-pass">
        <label>
          <span>Nueva contraseña</span>
          <input
            onChange={passwordValidation}
            className="newPassword"
            type={"password"}
          />
          <button onClick={viewPasswordNP} className="view-password">
            {modeViewNP == "invisible" ? (
              <AiOutlineEyeInvisible />
            ) : (
              <AiOutlineEye />
            )}
          </button>
        </label>

        <label>
          <span>Confirmar nueva contraseña</span>
          <input
            onChange={passwordValidation}
            className="confirmNewPassword"
            type={"password"}
          />
          <button onClick={viewPasswordCNP} className="view-password">
            {modeViewCNP == "invisible" ? (
              <AiOutlineEyeInvisible />
            ) : (
              <AiOutlineEye />
            )}
          </button>
        </label>

        <label>
          <button onClick={send} className="button">
            Enviar
          </button>
        </label>

        <p id="error"></p>
      </main>

      <Footer />
    </>
  );
}
