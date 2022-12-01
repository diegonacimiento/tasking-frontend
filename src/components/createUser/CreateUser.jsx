import Header from "../header/Header";
import Footer from "../footer/Footer";
import { Link } from "react-router-dom";
import "./createUser.css";
import usersService from "../../services/user.service";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../../context/Context";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const service = new usersService();

export default function CreateUser() {
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

  function error(e) {
    document.getElementById("error").textContent = e;
  }

  function inputDefault(input) {
    document.querySelector(`.${input}`).removeAttribute("style");

  };

  function verifyInputs() {
    const username = document.querySelector(".user").value;
    const email = document.querySelector(".email").value;
    const password = document.querySelector(".newPassword").value;
    const confirmPassword = document.querySelector(".confirmNewPassword").value;
    
      if(!username) {
        document.querySelector(".user").setAttribute("style", "border: 1px solid rgb(238, 16, 16)");
        error("Debe completar todos los campos.");
      };
      if(!email) {
        document.querySelector(".email").setAttribute("style", "border: 1px solid rgb(238, 16, 16)");
        error("Debe completar todos los campos.");
      };
      if(!password) {
        document.querySelector(".newPassword").setAttribute("style", "border: 1px solid rgb(238, 16, 16)");
        error("Debe completar todos los campos.");
      };
      if(!confirmPassword) {
        document.querySelector(".confirmNewPassword").setAttribute("style", "border: 1px solid rgb(238, 16, 16)");
        error("Debe completar todos los campos.");
      };
      
  };

 

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


    if (username && email && password && confirmPassword) {
      console.log(body)

      const newUser = service.create(body);

      newUser
        .then((res) => {
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
              return navigate("/tasking-frontend/");
            }
          });
        })
        .catch((e) => {
          console.log(e)
          const containId = e.response.data.errors[0].message.includes("id");
          const containEmail =
            e.response.data.errors[0].message.includes("email");
          if (containId) error("El usuario ya está en uso, elige otro.");
          else if (containEmail) error("Mail en uso, elige otro.");
        });
    }
    else {
      
    };
  }
  const style = document.documentElement.style;

  style.setProperty("--heightRoot", "100vh");
  style.setProperty("--minHeightRoot", "620px");

  return (
    <>
      <Header />

      <main className="main-create-user">
        <form onClick={send}>
          <h3>Completa el registro</h3>

          <label>
            <span>Usuario</span>
            <input onChange={() => inputDefault("user")} className="user" type={"text"} />
          </label>
          <label>
            <span>Correo electrónico</span>
            <input
              onChange={() => {
                const valideMail = emailValidation();
                if(valideMail == "valido") verifyInputs();
              }}
              className="email"
              type={"email"}
            />
          </label>
          <label className="label-pass">
            <span>Contraseña</span>
            <div className="contain-input-button-pass">
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
            </div>

            
          </label>
          <label className="label-confirm-pass">
            <span>Confirmar contraseña</span>
            <div className="contain-input-button-pass">
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
            </div>

           
          </label>
          <label id="label-button">
            <button onClick={createUser} className="button">
              Crear
            </button>
          </label>
        </form>

        <p id="error"></p>

        <div className="main-create-user__login">
          <h3>¿Ya estás registrado?</h3>
          <Link className="link-login" to={"/tasking-frontend/login"}>
            Iniciar sesión
          </Link>
        </div>
      </main>

      <Footer />
    </>
  );
}
