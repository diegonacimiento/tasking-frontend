import React, { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Context } from "../../context/Context";
import usersService from "../../services/user.service";
import Loading from "../loading/Loading";
import "./createUser.css";

const service = new usersService();

export default function CreateUser() {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const {
    setToken,
    modeViewNP,
    modeViewCNP,
    emailValidation,
    passwordValidation,
    viewPasswordNP,
    viewPasswordCNP,
  } = useContext(Context);

  function send(e) {
    e.preventDefault();
  }

  function error(msg, type, cl) {
    if (type) {
      document
        .querySelector(`.span-${cl}`)
        .setAttribute("style", "color: rgb(238, 16, 16)");
      document
        .querySelector(`.e-${cl}`)
        .setAttribute("style", "color: rgb(238, 16, 16)");
      document.querySelector(`.e-${cl}`).textContent = msg;
    } else {
      document
        .getElementById("error")
        .setAttribute("style", "color: rgb(238, 16, 16)");
      document.getElementById("error").textContent = msg;
    }
  }

  function inputDefault(input) {
    document.querySelector(`.${input}`).removeAttribute("style");
    document.querySelector(`.e-${input}`).textContent = "";
    document.querySelector(`.span-${input}`).removeAttribute("style");
  }

  function verifyInputs() {
    const inputs = [
      { selector: ".user", spanSelector: ".span-user", errorMessage: "Debe completar todos los campos" },
      { selector: ".email", spanSelector: ".span-email", errorMessage: "Debe completar todos los campos" },
      { selector: ".newPassword", spanSelector: ".span-password", errorMessage: "Debe completar todos los campos" },
      { selector: ".confirmNewPassword", spanSelector: ".span-password-confirm", errorMessage: "Debe completar todos los campos" }
    ];
  
    error("");
  
    inputs.forEach(input => {
      const value = document.querySelector(input.selector).value;
      const span = document.querySelector(input.spanSelector);
      const element = document.querySelector(input.selector);
  
      if (!value) {
        element.style.border = "1px solid rgb(238, 16, 16)";
        span.style.color = "rgb(238, 16, 16)";
        error(input.errorMessage);
      } else {
        element.style.border = "";
        span.style.color = "";
      }
    });
  }
  

  function createUser() {
    verifyInputs();

    const username = document.querySelector(".user").value.toLowerCase();
    const email = document.querySelector(".email").value;
    const password = document.querySelector(".newPassword").value;
    const confirmPassword = document.querySelector(".confirmNewPassword").value;

    const body = {
      id: `${username}`,
      email: `${email}`,
      password: `${password}`,
    };

    if (username && email && password && confirmPassword && loading === false) {
      setLoading(true);

      const newUser = service.create(body);

      document
        .getElementById("error")
        .setAttribute("style", "color: var(--colorBotton)");
      document.getElementById("error").textContent = "Validando datos...";

      newUser
        .then(() => {
          const body = {
            username: `${email}`,
            password: `${password}`,
          };
          const user = service.loginUser(body);
          user.then((res) => {
            localStorage.setItem("user", `${res.data.user.id}`);
            localStorage.setItem("email", `${res.data.user.email}`);
            if (res.data.token) {
              localStorage.setItem("token", `${res.data.token}`);
              setToken(res.data.token);
              return navigate("/");
            }
          });
        })
        .catch((e) => {
          document.getElementById("error").removeAttribute("style");
          document.getElementById("error").textContent = "";
          if (e.response.status == 500) {
            error("Ha ocurrido un error.")
            return navigate("/serverError");
          }
          const containId = e.response.data.errors[0].message.includes("id");
          const containEmail =
            e.response.data.errors[0].message.includes("email");
          if (containId) {
            document
              .querySelector(".user")
              .setAttribute("style", "border: 1px solid rgb(238, 16, 16)");
            error("Usuario en uso, elige otro.", true, "user");
          } else if (containEmail) {
            document
              .querySelector(".email")
              .setAttribute("style", "border: 1px solid rgb(238, 16, 16)");
            error("Email en uso, elige otro.", true, "mail");
          }
        })
        .finally(() => setLoading(false));
    }
  }

  return (
    <main className="main-create-user">
      <h3>Completa el registro</h3>
      <form onClick={send}>

        <label>
          <span className="span-user">Usuario</span>
          <input
            onChange={() => {
              inputDefault("user");
              document.getElementById("error").textContent = "";
            }}
            className="user"
            type={"text"}
          />
          <p className="error e-user"></p>
        </label>
        <label>
          <span className="span-email">Correo electrónico</span>
          <input
            onChange={() => {
              emailValidation();
              document.getElementById("error").textContent = "";
            }}
            className="email"
            type={"email"}
          />
          <p className="error e-mail"></p>
        </label>
        <label className="label-pass">
          <span className="span-password">Contraseña</span>
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
        <label className="label-confirm-pass">
          <span className="span-password-confirm">Confirmar contraseña</span>
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
        <label id="label-button">
          <button onClick={createUser} className="button">
            {loading ? <Loading /> : "Crear"}
          </button>
        </label>
      </form>

      <p id="error"></p>

      <div className="main-create-user__login">
        <h3>¿Ya estás registrado?</h3>
        <Link className="link-login" to={"/login"}>
          Iniciar sesión
        </Link>
      </div>
    </main>
  );
}
