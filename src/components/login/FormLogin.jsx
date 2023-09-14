import React, { useState, useRef, useEffect } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import Loading from "../loading/Loading";
import useForm from "../../hooks/useForm";

export default function FormLogin() {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({});

  const { sendFormLogin, showError, hasDataInput } = useForm();

  const error = useRef(null);
  const formRef = useRef(null);

  useEffect(() => {
    setForm({
      email: {
        span: formRef.current.children[0].children[0],
        input: formRef.current.children[0].children[1],
        error: error.current,
      },
      password: {
        span: formRef.current.children[1].children[0],
        input: formRef.current.children[1].children[1],
        error: error.current,
      },
    });
  }, []);

  function toggleShowPassword(e) {
    e.preventDefault();
    setShowPassword((prevState) => !prevState);
  }

  function handleSubmit(e) {
    e.preventDefault();

    const valueEmail = form.email.input.value;
    const valuePassword = form.password.input.value;

    const isValidateForm = hasDataInput(
      form,
      error,
      "Ingrese su email y contraseña",
    );

    if (!isValidateForm) return null;

    const body = {
      username: `${valueEmail}`,
      password: `${valuePassword}`,
    };

    setLoading(true);

    async function responseSendForm() {
      try {
        await sendFormLogin(body);
      } catch (e) {
        showError(e, form.email);
        showError(e, form.password);
      } finally {
        setLoading(false);
      }
    }
    responseSendForm();
  }

  return (
    <form className="main-login__login" onSubmit={handleSubmit} ref={formRef}>
      <label>
        <span>Email</span>
        <input type={"email"} name="email" />
      </label>
      <label>
        <span>Contraseña</span>
        <input type={showPassword ? "text" : "password"} name="password" />
        <button
          title={showPassword ? "Ocultar contraseña" : "Ver contraseña"}
          onClick={toggleShowPassword}
          className="show-password"
          type="button"
        >
          {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
        </button>
      </label>

      <button title="Iniciar sesión" className="button" type="submit">
        {loading ? <Loading /> : "Iniciar sesión"}
      </button>
      <p id="error" ref={error}></p>
    </form>
  );
}
