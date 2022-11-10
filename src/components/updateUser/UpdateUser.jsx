import Header from "../header/Header";
import Footer from "../footer/Footer";
import "./updateUser.css";

export default function UpdateUser() {

    function error() {
        document.getElementById("error").textContent = "EL usuario ya existe"
    };

  return (
    <>
      <div id="header-edit">
        <Header ban={true} />
      </div>

      <div id="contain-edit">
        <h1 id="h1-edit">Actualizar usuario</h1>

        <div id="form-edit">
          <label>
            <span>Usuario</span>
            <input type={"text"} />
          </label>
          <label>
            <span>Correo electrónico</span>
            <input type={"text"} />
          </label>
          <label>
            <span>Contraseña actual</span>
            <input type={"text"} />
          </label>
          <label>
            <span>Nueva contraseña</span>
            <input type={"text"} />
          </label>
          <label>
            <span>Confirmar nueva contraseña</span>
            <input type={"text"} />
          </label>
        </div>

        <span id="error"></span>

        <button onClick={error} className="button" id="bt-update">Guardar cambios</button>
      </div>

      <Footer />
    </>
  );
}
