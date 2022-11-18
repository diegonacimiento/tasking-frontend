import Header from "../header/Header";
import Footer from "../footer/Footer";
import "./updateUser.css";

export default function UpdateUser() {
  function error(e) {
    e.preventDefault();
    document.getElementById("error").textContent = "EL usuario ya existe";
  };

  const style = document.documentElement.style;

  style.setProperty("--heightRoot", "100vh");
  style.setProperty("--minHeightRoot", "620px");

  return (
    <>
      <Header ban={true} />

      <main className="main-update">

        <form onSubmit={error}>

        <h2>Actualizar usuario</h2>

          <label>
            <span>Usuario</span>
            <input type={"text"} />
          </label>
          <label>
            <span>Correo electrónico</span>
            <input type={"email"} />
          </label>
          <label>
            <span>Contraseña actual</span>
            <input type={"password"} />
          </label>
          <label>
            <span>Nueva contraseña</span>
            <input type={"password"} />
          </label>
          <label>
            <span>Confirmar nueva contraseña</span>
            <input type={"password"} />
          </label>

          <button className="button">Guardar cambios</button>

          <p id="error"></p>

        </form>

      </main>

      <Footer />
    </>
  );
}
