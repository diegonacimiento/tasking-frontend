import "./login.css";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../../context/Context";
import usersService from "../../services/user.service";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";


const service = new usersService();

export default function Login() {
 
 const navigate = useNavigate();

 const { setToken, modeViewPass, viewPassword } = useContext(Context);

  function create() {
    navigate("/create-user");
  }

  const style = document.documentElement.style;

  style.setProperty("--heightRoot", "100vh");
  style.setProperty("--minHeightRoot", "620px");

  function login() {
    const email = document.getElementById("input-email").value;
    const password = document.querySelector(".password").value;
    const error = document.getElementById("error");
    const body = {
      username: `${email}`,
      password: `${password}`,
    };
    const user = service.loginUser(body);
    user
      .then((res) => {
        localStorage.setItem("user", `${res.data.user.id}`);
        localStorage.setItem("email", `${res.data.user.email}`);
        if (res.data.token) {
          localStorage.setItem("token", `${res.data.token}`);
          localStorage.setItem("timeToken", `${Date.now()}`);
          setToken(res.data.token);
          return navigate("/");
        }
      })
      .catch((e) => {
        if (e.response.status == 400) {
          error.textContent = `Ingrese su email y contraseña`;
        } else if (e.response.status == 401 || 404) {
          error.textContent = `Contraseña incorrecta`;
        }
      });
  }

  return (
    <>
      <Header />

      <main className="main-login">
        <div className="main-login__login">
          <input id="input-email" type={"email"} placeholder="Email" />
          <div className="password-contain">
          <input
            className="password"
            type={"password"}
            placeholder="Contraseña"
          />
          <button onClick={viewPassword} className="view-password">
              {modeViewPass == "invisible" ? (
                <AiOutlineEyeInvisible />
              ) : (
                <AiOutlineEye />
              )}
            </button>
          </div>
          
          <button className="button" onClick={login}>
            Iniciar sesión
          </button>
          <p id="error"></p>
        </div>

        <Link className="main-login__link-rp" to="/recovery-password">
          ¿Olvidaste tu contraseña?
        </Link>

        <div className="main-login__create-user">
          <h3>¿Aún no tienes un usuario?</h3>
          <button className="button" onClick={create}>
            Crear usuario
          </button>
        </div>
      </main>

      <Footer />
    </>
  );
}
