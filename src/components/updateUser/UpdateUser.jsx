import React, { useContext, useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Context } from "../../context/Context";
import Loading from "../loading/Loading";
import useForm from "../../hooks/useForm";
import usersService from "../../services/user.service";
import "./updateUser.css";

const service = new usersService();

export default function UpdateUser() {
  const { token } = useContext(Context);

  const navigate = useNavigate();

  const { showError, validatePasswords, hasDataInput, showSuccessMessage } =
    useForm();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [form, setForm] = useState({});

  const formRef = useRef(null);
  const msgForm = useRef(null);

  useEffect(() => {
    setForm({
      email: {
        span: formRef.current.children[0].children[0],
        input: formRef.current.children[0].children[1],
        error: formRef.current.children[0].children[2],
      },
      password: {
        span: formRef.current.children[1].children[0],
        input: formRef.current.children[1].children[1],
        error: formRef.current.children[1].children[3],
      },
      newPassword: {
        span: formRef.current.children[2].children[0],
        input: formRef.current.children[2].children[1],
        error: formRef.current.children[2].children[3],
      },
      confirmPassword: {
        span: formRef.current.children[3].children[0],
        input: formRef.current.children[3].children[1],
        error: formRef.current.children[3].children[3],
      },
    });
  }, []);

  function toggleShowPassword(e) {
    e.preventDefault();
    setShowPassword((prevState) => !prevState);
  }

  function toggleShowNewPassword(e) {
    e.preventDefault();
    setShowNewPassword((prevState) => !prevState);
  }

  function toggleShowConfirmPassword(e) {
    e.preventDefault();
    setShowConfirmPassword((prevState) => !prevState);
  }

  async function updateEmail(body) {
    try {
      await service.update(body, token);
      showSuccessMessage("Datos actualizados", msgForm);
      localStorage.setItem("email", body.email);
    } catch (e) {
      if (e.response.status === 401) {
        showError("La contraseña es incorrecta", form.password);
      } else if (e.response.status === 409) {
        showError("Email en uso, elija otro", formRef.email);
      } else navigate("/server-error");
    } finally {
      setLoading(false);
    }
  }

  async function updatePassword(body) {
    try {
      await service.updatePassword(body, token);
      showSuccessMessage("Datos actualizados", msgForm);
    } catch (e) {
      if (e.response.status === 400 || e.response.status === 401) {
        showError("La contraseña es incorrecta", form.password);
      } else navigate("/server-error");
    } finally {
      setLoading(false);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    const emailValue = form.email.input.value;
    const newPasswordValue = form.newPassword.input.value;

    if (emailValue !== localStorage.getItem("email") && emailValue) {
      const hasPasswordValue = hasDataInput(
        { password: form.password },
        null,
        "Debe ingresar su contraseña",
      );
      if (!hasPasswordValue) return null;
      setLoading(true);
      updateEmail({ email: emailValue });
    }

    if (newPasswordValue) {
      const hasPasswordValue = hasDataInput(
        { password: form.password },
        null,
        "Debe ingresar su contraseña",
      );
      if (!hasPasswordValue) return null;

      const isValidatePasswords = validatePasswords(
        form.newPassword,
        form.confirmPassword,
      );
      if (!isValidatePasswords) return null;

      const bodyUpdatePassword = {
        password: form.password.input.value,
        newPassword: newPasswordValue,
        confirmNewPassword: form.confirmPassword.input.value,
      };

      setLoading(true);

      updatePassword(bodyUpdatePassword);
    }

    return null;
  }

  return (
    <main className="main-update" data-aos="fade-right">
      <h2>{"Hola " + localStorage.getItem("user")}</h2>

      <h3>Actualiza tus datos</h3>

      <form onSubmit={handleSubmit} ref={formRef}>
        <label>
          <span>Correo electrónico</span>
          <input type={"email"} defaultValue={localStorage.getItem("email")} />
          <p className="error"></p>
        </label>

        <label>
          <span>Contraseña actual</span>
          <input type={showPassword ? "text" : "password"} />
          <button
            className="show-password"
            title={showPassword ? "Ocultar contraseña" : "Ver contraseña"}
            onClick={toggleShowPassword}
            type="button"
          >
            {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
          </button>
          <p className="error"></p>
        </label>

        <label>
          <span>Nueva contraseña</span>
          <input type={showNewPassword ? "text" : "password"} />
          <button
            className="show-password"
            title={showNewPassword ? "Ocultar contraseña" : "Ver contraseña"}
            onClick={toggleShowNewPassword}
            type="button"
          >
            {showNewPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
          </button>
          <p className="error"></p>
        </label>

        <label>
          <span>Confirmar nueva contraseña</span>
          <input type={showConfirmPassword ? "text" : "password"} />
          <button
            className="show-password"
            title={
              showConfirmPassword ? "Ocultar contraseña" : "Ver contraseña"
            }
            onClick={toggleShowConfirmPassword}
            type="button"
          >
            {showConfirmPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
          </button>
          <p className="error"></p>
        </label>

        <button title="Enviar" className="button" type="submit">
          {loading ? <Loading /> : "Guardar cambios"}
        </button>

        <p id="error" ref={msgForm}></p>
      </form>
    </main>
  );
}
