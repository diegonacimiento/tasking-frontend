import Header from "../header/Header";
import Footer from "../footer/Footer";
import "./updateUser.css";
import { useContext } from "react";
import { Context } from "../../context/Context";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import usersService from "../../services/user.service";

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

  const email = document.querySelector(".main-update__input-email");

    const password = document.querySelector(".password");
    const newPassword = document.querySelector(".newPassword");
    const confirmNewPassword = document.querySelector(".confirmNewPassword");

  function validationNewPassword() {
    passwordValidation();
    if (newPassword.value.length == 0) emailValidation();
  };

  function validationConfirmNewPassword() {
    passwordValidation();
    if (confirmNewPassword.value.length == 0) emailValidation();
  };

  function sendForm() {

    if (email.value !== localStorage.getItem("email")) {
      const emailUpdate = service.update({ email: email.value }, token);
      emailUpdate
        .then((res) => {
          document
            .getElementById("error")
            .setAttribute("style", "color: green");
          document.getElementById("error").textContent =
            "Información actualizada con éxito.";
          email.removeAttribute("style");
          localStorage.setItem("email", email.value);
        })
        .catch((e) => {
          if (e.response.status == 409) {
            document
              .getElementById("error")
              .setAttribute("style", "color: rgb(238, 16, 16)");
            document.getElementById("error").textContent =
              "El mail ya está en uso, elige otro.";
            email.setAttribute("style", "border: 1px solid rgb(238, 16, 16)");
          }
        });
    }

    if (newPassword.value.length && confirmNewPassword.value.length > 5) {
      if (password.value.length < 1) {
        document
          .getElementById("error")
          .setAttribute("style", "color: rgb(238, 16, 16)");
        document.getElementById("error").textContent =
          "Debe ingresar su contraseña.";
        password.setAttribute("style", "border: 1px solid rgb(238, 16, 16)");
        return;
      }

      password.removeAttribute("style", "border: 1px solid rgb(238, 16, 16)");

      const passwordUpdate = service.updatePassword(
        {
          password: password.value,
          newPassword: newPassword.value,
          confirmNewPassword: confirmNewPassword.value,
        },
        token
      );
      passwordUpdate
        .then((res) => {
          document
            .getElementById("error")
            .setAttribute("style", "color: green");
          document.getElementById("error").textContent =
            "Información actualizada con éxito.";
        })
        .catch((e) => {
          if (e.response.status == 401) {
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
        });
    }
  }

  function error(e) {
    e.preventDefault();
  }

  const style = document.documentElement.style;

  style.setProperty("--heightRoot", "100vh");
  style.setProperty("--minHeightRoot", "620px");

  return (
    <>
      <Header ban={true} />

      <main className="main-update">
        <form onSubmit={error}>
          <h2>{"Hola " + localStorage.getItem("user")}</h2>

          <label>
            <h3>Actualizar datos</h3>
          </label>
          <label>
            <span>Correo electrónico</span>
            <input
              onChange={() => {
                const valideMail = emailValidation();
                if(valideMail == "valido") passwordValidation();
              }}
              className="main-update__input-email email"
              type={"email"}
              defaultValue={localStorage.getItem("email")}
            />
          </label>
          <label>
            <span>Contraseña actual</span>
            <input className="password" type={"password"} />
            <button onClick={viewPassword} className="view-password">
              {modeViewPass == "invisible" ? (
                <AiOutlineEyeInvisible />
              ) : (
                <AiOutlineEye />
              )}
            </button>
          </label>
          <label>
            <span>Nueva contraseña</span>
            <input
              onChange={validationNewPassword}
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
          </label>
          <label>
            <span>Confirmar nueva contraseña</span>
            <input
              onChange={validationConfirmNewPassword}
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
          </label>

          <button onClick={sendForm} className="button">
            Guardar cambios
          </button>

          <p id="error"></p>
        </form>
      </main>

      <Footer />
    </>
  );
}
