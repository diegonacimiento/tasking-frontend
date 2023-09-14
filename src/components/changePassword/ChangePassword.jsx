import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import Loading from "../loading/Loading";
import useForm from "../../hooks/useForm";
import usersService from "../../services/user.service";
import "./changePassword.css";

const service = new usersService();

export default function ChangePassword() {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({});
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const formRef = useRef(null);
  const errorForm = useRef(null);

  const { showError, hasDataInput, validatePasswords } = useForm();

  useEffect(() => {
    setForm({
      newPassword: {
        span: formRef.current.children[0].children[0],
        input: formRef.current.children[0].children[1],
        error: formRef.current.children[0].children[3],
      },
      confirmPassword: {
        span: formRef.current.children[1].children[0],
        input: formRef.current.children[1].children[1],
        error: formRef.current.children[1].children[3],
      },
    });
  }, []);

  const navigate = useNavigate();

  function toggleShowNewPassword(e) {
    e.preventDefault();
    setShowNewPassword((prevState) => !prevState);
  }

  function toggleShowConfirmPassword(e) {
    e.preventDefault();
    setShowConfirmPassword((prevState) => !prevState);
  }

  function checkForm() {
    const isFormComplete = hasDataInput(
      form,
      errorForm,
      "Ingrese y confirme su nueva contraseña",
    );
    if (isFormComplete) {
      const isValidatePasswords = validatePasswords(
        form.newPassword,
        form.confirmPassword,
      );
      return isValidatePasswords;
    }
    return false;
  }

  async function sendForm(body) {
    try {
      await service.recoveryChangePassword(body);
      errorForm.current.setAttribute("style", "color: green");
      errorForm.current.textContent = "Cambio de contraseña exitoso.";
      return navigate("/");
    } catch (e) {
      if (e.response.status === 500) return navigate("/server-error");
      showError("Ha ocurrido un error, envíe nuevamente el email", errorForm);
    } finally {
      setLoading(false);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    const isValidateForm = checkForm();

    if (!isValidateForm) return null;

    const uri = window.location.href;

    const index = uri.indexOf("ey");

    const recoveryToken = uri.substring(index, uri.length);

    const body = {
      recoveryToken,
      newPassword: form.newPassword.input.value,
    };

    setLoading(true);

    sendForm(body);
  }

  return (
    <main className="main-change-password">
      <form onSubmit={handleSubmit} ref={formRef}>
        <label>
          <span>Nueva contraseña</span>
          <input
            type={showNewPassword ? "text" : "password"}
            name="new-password"
          />
          <button
            onClick={toggleShowNewPassword}
            title={showNewPassword ? "Ocultar contraseña" : "Ver contraseña"}
            className="show-password"
            type="button"
          >
            {showNewPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
          </button>
          <p className="error"></p>
        </label>

        <label>
          <span>Confirmar nueva contraseña</span>
          <input
            type={showConfirmPassword ? "text" : "password"}
            name="confirm-password"
          />
          <button
            onClick={toggleShowConfirmPassword}
            title={
              showConfirmPassword ? "Ocultar contraseña" : "Ver contraseña"
            }
            className="show-password"
            type="button"
          >
            {showConfirmPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
          </button>
          <p className="error"></p>
        </label>

        <button title="Enviar" className="button" type="submit">
          {loading ? <Loading /> : "Enviar"}
        </button>

        <p id="error" ref={errorForm}></p>
      </form>
    </main>
  );
}
