import React from "react";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import "./updateUser.css";
import { useContext, useState } from "react";
import { Context } from "../../context/Context";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import usersService from "../../services/user.service";
import Loading from "../loading/Loading";

const service = new usersService();

export default function UpdateUser() {
  const {
    token,
    modeViewPass,
    modeViewNP,
    modeViewCNP,
    viewPassword,
    viewPasswordNP,
    viewPasswordCNP,
    emailValidation,
    passwordValidation,
  } = useContext(Context);

  const [loading, setLoading] = useState(false);

  function sendForm() {
    const email = document.querySelector(".main-update__input-email");

    const password = document.querySelector(".password");
    const newPassword = document.querySelector(".newPassword");
    const confirmNewPassword = document.querySelector(".confirmNewPassword");

    if (email.value !== localStorage.getItem("email")) {
      setLoading(true);
      const emailUpdate = service.update({ email: email.value }, token);
      emailUpdate
        .then(() => {
          document
            .getElementById("error")
            .setAttribute("style", "color: green");
          document.getElementById("error").textContent = "Datos actualizados.";
          email.removeAttribute("style");
          localStorage.setItem("email", email.value);
        })
        .catch((e) => {
          if (e.response.status == 409) {
            document
              .getElementById("error")
              .setAttribute("style", "color: rgb(238, 16, 16)");
            document.getElementById("error").textContent =
              "El email ya está en uso, elige otro.";
            email.setAttribute("style", "border: 1px solid rgb(238, 16, 16)");
          }
        })
        .finally(() => setLoading(false));
    }

    if (newPassword.value.length && confirmNewPassword.value.length > 5) {
      if (password.value.length < 1) {
        document
          .querySelector(".e-pass-act")
          .setAttribute("style", "color: rgb(238, 16, 16)");
        document.querySelector(".e-pass-act").textContent =
          "Debe ingresar su contraseña.";
        password.setAttribute("style", "border: 1px solid rgb(238, 16, 16)");
        document
          .querySelector(".span-pass-act")
          .setAttribute("style", "color: rgb(238, 16, 16)");
        return;
      }

      password.removeAttribute("style", "border: 1px solid rgb(238, 16, 16)");

      setLoading(true);
      const passwordUpdate = service.updatePassword(
        {
          password: password.value,
          newPassword: newPassword.value,
          confirmNewPassword: confirmNewPassword.value,
        },
        token
      );
      passwordUpdate
        .then(() => {
          document
            .getElementById("error")
            .setAttribute("style", "color: darkgreen");
          document.getElementById("error").textContent = "Datos actualizados.";
        })
        .catch((e) => {
          if (
            e.response.status == 401 ||
            e.response.data.message.includes("length")
          ) {
            document
              .getElementById("error")
              .setAttribute("style", "color: rgb(238, 16, 16)");
            document.getElementById("error").textContent =
              "Contraseña incorrecta.";
            password.setAttribute(
              "style",
              "border: 1px solid rgb(238, 16, 16)"
            );
          } else {
            document
              .getElementById("error")
              .setAttribute("style", "color: rgb(238, 16, 16)");
            document.getElementById("error").textContent =
              "Asegúrese que coincidan.";
            newPassword.setAttribute(
              "style",
              "border: 1px solid rgb(238, 16, 16)"
            );
            confirmNewPassword.setAttribute(
              "style",
              "border: 1px solid rgb(238, 16, 16)"
            );
          }
        })
        .finally(() => setLoading(false));
    }
  }

  function error(e) {
    e.preventDefault();
  }

  const style = document.documentElement.style;

  style.setProperty("--heightRoot", "100vh");
  style.setProperty("--minHeightRoot", "725px");

  return (
    <>
      <Header ban={true} />

      <main className="main-update">
        <form onSubmit={error}>
          <h2>{"Hola " + localStorage.getItem("user") + "."}</h2>

          <label>
            <h3>Actualiza tus datos.</h3>
          </label>
          <label>
            <span className="span-mail">Correo electrónico</span>
            <input
              onChange={emailValidation}
              className="main-update__input-email email"
              type={"email"}
              defaultValue={localStorage.getItem("email")}
            />
            <p className="error e-mail"></p>
          </label>
          <label>
            <span className="span-pass-act">Contraseña actual</span>
            <div className="contain-input-button-pass">
              <input
                onChange={() => {
                  document
                    .querySelector(".e-pass-act")
                    .removeAttribute("style");
                  document.querySelector(".e-pass-act").textContent = "";
                  document.querySelector(".password").removeAttribute("style");
                  document
                    .querySelector(".span-pass-act")
                    .removeAttribute("style");
                }}
                className="password"
                type={"password"}
              />
              <button onClick={viewPassword} className="view-password">
                {modeViewPass == "invisible" ? (
                  <AiOutlineEyeInvisible />
                ) : (
                  <AiOutlineEye />
                )}
              </button>
            </div>
            <p className="error e-pass-act"></p>
          </label>
          <label>
            <span className="span-pass">Nueva contraseña</span>
            <div className="contain-input-button-pass">
              <input
                onChange={passwordValidation}
                className="newPassword"
                type={"password"}
                minLength={6}
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
                onChange={passwordValidation}
                className="confirmNewPassword"
                type={"password"}
                minLength={6}
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

          <button onClick={sendForm} className="button">
            {loading ? <Loading /> : "Guardar cambios"}
          </button>

          <p id="error"></p>
        </form>
      </main>

      <Footer />
    </>
  );
}
