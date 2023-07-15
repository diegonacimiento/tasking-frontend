import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Context } from "../../context/Context";
import usersService from "../../services/user.service";
import Loading from "../loading/Loading";
import "./changePassword.css";

const service = new usersService();

export default function ChangePassword() {
  const {
    modeViewNP,
    modeViewCNP,
    passwordValidation,
    viewPasswordNP,
    viewPasswordCNP,
  } = useContext(Context);

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  function error(msg) {
    document.getElementById("error").textContent = msg;
    const newPassword = document.querySelector(".newPassword");
    const confirmNewPassword = document.querySelector(".confirmNewPassword");
    newPassword.setAttribute("style", "border: 1px solid rgb(238, 16, 16)");
    confirmNewPassword.setAttribute(
      "style",
      "border: 1px solid rgb(238, 16, 16)"
    );
    document
      .querySelector(".span-pass")
      .setAttribute("style", "color: rgb(238, 16, 16)");
    document
      .querySelector(".span-con-pass")
      .setAttribute("style", "color: rgb(238, 16, 16)");
  }

  function send() {
    const newPassword = document.querySelector(".newPassword").value;
    const confirmNewPassword = document.querySelector(
      ".confirmNewPassword"
    ).value;

    if (!newPassword && !confirmNewPassword)
      return error("Debe rellenar todos los campos.");

    if (newPassword !== confirmNewPassword) return;

    const uri = window.location.href;

    const index = uri.indexOf("ey");

    const recoveryToken = uri.substring(index, uri.length);

    const body = {
      recoveryToken,
      newPassword,
    };

    setLoading(true);

    const changePass = service.recoveryChangePassword(body);

    changePass
      .then(() => {
        document.getElementById("error").setAttribute("style", "color: green");
        document.getElementById("error").textContent =
          "Cambio de contraseña exitoso.";
        navigate("/");
      })
      .catch(() => error("Ha ocurrido un error, envíe nuevamente el email."))
      .finally(() => setLoading(false));
  }

  return (
    <main className="main-change-pass">
      <label>
        <span className="span-pass">Nueva contraseña</span>
        <div className="contain-input-button-pass">
          <input
            onChange={() => {
              passwordValidation();
              document.getElementById("error").textContent = "";
            }}
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
        </div>
        <p className="error e-pass"></p>
      </label>

      <label>
        <span className="span-con-pass">Confirmar nueva contraseña</span>
        <div className="contain-input-button-pass">
          <input
            onChange={() => {
              passwordValidation();
              document.getElementById("error").textContent = "";
            }}
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
        </div>

        <p className="error e-con-pass"></p>
      </label>

      <label>
        <button onClick={send} className="button">
          {loading ? <Loading /> : "Enviar"}
        </button>
      </label>

      <p id="error"></p>
    </main>
  );
}
